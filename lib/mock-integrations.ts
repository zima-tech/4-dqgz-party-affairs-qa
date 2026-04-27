import { appMeta } from "@/lib/domain";

export type MockAiResponse = {
  topic: string;
  result: string;
};

export async function runLocalAiAssistant(prompt: string): Promise<MockAiResponse> {
  const topic = prompt.trim().slice(0, 48) || appMeta.aiTitle;
  const modules = appMeta.modules.slice(0, 4).join("、");

  return {
    topic,
    result: [
      `咨询主题：${topic}`,
      `建议从${modules}四个维度组织答复，并保留人工复核节点。`,
      "处理流程：先匹配政策条款与流程模板，再输出标准答复，最后补充岗位化学习推荐。",
      "风险提示：若为高优先级咨询，应同步标注风险边界并给出处置升级路径。",
    ].join("\n"),
  };
}

export function getMockIntegrationHealth() {
  return appMeta.integrations.map((service, index) => ({
    service,
    status: index === 0 ? "已采集" : index === 1 ? "已校验" : "持续更新",
    batch: `${service}·2026年第${index + 1}批`,
    quality: index === 0 ? "完整率 98%" : index === 1 ? "准确率 96%" : "抽检通过",
    detail:
      index === 0
        ? "已完成法规条款清洗，支持政策解读与问答检索。"
        : index === 1
        ? "已完成流程手册校验，支持标准化答复与步骤指引。"
        : "历史问答与政策订阅持续更新，支持个性化学习推荐。",
  }));
}
