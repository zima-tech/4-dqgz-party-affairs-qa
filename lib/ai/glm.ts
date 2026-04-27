import { appMeta } from "@/lib/domain";

export type GlmAssistantInput = {
  prompt: string;
  item: {
    title: string;
    category: string;
    status: string;
    riskLevel: string;
    owner: string;
    description: string;
    sourceBatch: string;
  };
  history?: Array<{
    prompt: string;
    result: string;
  }>;
};

export type GlmAssistantResponse = {
  topic: string;
  result: string;
  source: "glm" | "local";
};

const GLM_BASE_URL = process.env.GLM_BASE_URL ?? "https://open.bigmodel.cn/api/paas/v4";
const GLM_ENDPOINT = process.env.GLM_API_ENDPOINT ?? `${GLM_BASE_URL.replace(/\/$/, "")}/chat/completions`;
const GLM_MODEL = process.env.GLM_MODEL ?? "GLM-4.7-Flash";

function buildTopic(prompt: string, itemTitle: string) {
  const seed = prompt.trim().slice(0, 32);
  return seed ? `${itemTitle} · ${seed}`.slice(0, 48) : itemTitle.slice(0, 48);
}

function localBusinessDraft({ prompt, item }: GlmAssistantInput): GlmAssistantResponse {
  const topic = buildTopic(prompt, item.title);
  const focusAreas = appMeta.aiExperience.focusAreas.slice(0, 4);

  return {
    topic,
    source: "local",
    result: [
      `咨询对象：${item.title}`,
      `当前状态：${item.status}；责任岗位：${item.owner}；风险等级：${item.riskLevel}。`,
      `${focusAreas[0]}：建议围绕"${item.category}"先核验${item.sourceBatch}中的政策条款与流程版本。`,
      `${focusAreas[1]}：结合${item.description}，补充标准办理步骤、注意事项和边界条件。`,
      `${focusAreas[2]}：对高优先级咨询增加风险提示与升级处置建议。`,
      `${focusAreas[3]}：输出结果后建议直接采纳并写入服务留痕，便于后续追问与复盘。`,
    ].join("\n"),
  };
}

export async function runGlmAssistant(input: GlmAssistantInput): Promise<GlmAssistantResponse> {
  const apiKey = process.env.GLM_API_KEY;
  if (!apiKey) {
    return localBusinessDraft(input);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const historyText =
    input.history && input.history.length > 0
      ? input.history
          .slice(-3)
          .map((turn, index) => `第${index + 1}轮提问：${turn.prompt}\n第${index + 1}轮结论：${turn.result}`)
          .join("\n\n")
      : "当前为新会话，请直接输出首轮党务问答建议。";

  try {
    const response = await fetch(GLM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: GLM_MODEL,
        messages: [
          {
            role: "system",
            content: `你是${appMeta.department}${appMeta.shortName}的智能党务助手。请围绕${appMeta.aiExperience.focusAreas.join("、")}输出结构化问答建议，包括政策依据、流程指引、风险提示和学习推荐，避免技术细节、接口术语和部署描述。`,
          },
          {
            role: "user",
            content: [
              `咨询对象：${input.item.title}`,
              `条目类型：${input.item.category}`,
              `当前状态：${input.item.status}`,
              `责任岗位：${input.item.owner}`,
              `服务优先级：${input.item.riskLevel}`,
              `来源批次：${input.item.sourceBatch}`,
              `背景说明：${input.item.description}`,
              `历史上下文：${historyText}`,
              `本次诉求：${input.prompt}`,
              `请以"咨询对象 / 政策依据 / 办理步骤 / 风险提示 / 学习推荐"五段输出。`,
            ].join("\n"),
          },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      return localBusinessDraft(input);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return localBusinessDraft(input);
    }

    return {
      topic: buildTopic(input.prompt, input.item.title),
      result: content,
      source: "glm",
    };
  } catch {
    return localBusinessDraft(input);
  } finally {
    clearTimeout(timeout);
  }
}
