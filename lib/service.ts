import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { appMeta, seedInsights, seedRecords } from "@/lib/domain";
import { getMockIntegrationHealth } from "@/lib/mock-integrations";
import type { AiConversationView, DashboardSnapshot } from "@/lib/types";

function toIso(value: Date | null) {
  return value ? value.toISOString() : null;
}

function createSeedAiDrafts(items: Array<{ id: string; title: string; category: string; status: string; owner: string; riskLevel: string; sourceBatch: string }>) {
  return items.slice(0, 3).flatMap((item, index) => {
    const conversationId = `seed-${appMeta.seq}-conversation-${index + 1}`;
    const topic = `${item.title} · ${appMeta.aiExperience.resultType}`.slice(0, 48);
    const base = {
      conversationId,
      topic,
      resultType: appMeta.aiExperience.resultType,
      sourceSummary: `已读取${item.sourceBatch}，当前状态${item.status}，责任岗位${item.owner}。`,
      businessObjectId: item.id,
      businessObjectType: appMeta.sourceObjectName,
      businessObjectTitle: item.title,
      sourceMode: "local" as const,
      saveStatus: index === 0 ? appMeta.aiExperience.savedStatusLabel : "待采纳",
      saveSummary: index === 0 ? appMeta.aiExperience.savedSuccessText : null,
      savedAt: index === 0 ? new Date() : null,
    };

    return [
      {
        ...base,
        turnIndex: 0,
        prompt: appMeta.aiExperience.quickPrompts[index] ?? appMeta.aiPrompt,
        result: [
          `处理对象：${item.title}`,
          `${appMeta.aiExperience.focusAreas[0]}：建议围绕${item.category}先完成政策条款与流程规则核验。`,
          `${appMeta.aiExperience.focusAreas[1]}：由${item.owner}牵头办理，保持${item.status}阶段的服务留痕。`,
          `${appMeta.aiExperience.focusAreas[2]}：当前优先级${item.riskLevel}，建议补充升级处置路径。`,
        ].join("\n"),
        status: index === 0 ? "已保存" : "已形成初稿",
      },
      {
        ...base,
        turnIndex: 1,
        prompt: `请继续补充${appMeta.aiExperience.focusAreas[3]}与${appMeta.aiExperience.focusAreas[4]}。`,
        result: [
          `后续动作：继续围绕${item.title}完善${appMeta.aiExperience.focusAreas[3]}和${appMeta.aiExperience.focusAreas[4]}。`,
          `执行建议：同步更新标准答复、风险提示和学习推荐内容。`,
          `保存提醒：确认后可直接采纳，刷新页面仍可恢复当前会话。`,
        ].join("\n"),
        status: "已形成初稿",
      },
    ];
  });
}

function governanceUsers(now: Date) {
  return [
    {
      username: "admin",
      displayName: "演示管理员",
      department: appMeta.department,
      role: "系统管理员",
      status: "启用",
      lastLoginAt: now,
    },
    {
      username: `${appMeta.seq}-manager`,
      displayName: `${appMeta.shortName}负责人`,
      department: appMeta.department,
      role: "业务负责人",
      status: "启用",
      lastLoginAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    },
    {
      username: `${appMeta.seq}-analyst`,
      displayName: "党务专员",
      department: appMeta.department,
      role: "业务人员",
      status: "启用",
      lastLoginAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    },
    {
      username: `${appMeta.seq}-auditor`,
      displayName: "审计复核岗",
      department: appMeta.department,
      role: "审计员",
      status: "停用",
      lastLoginAt: null,
    },
  ];
}

function governanceSettings() {
  return [
    {
      group: "知识库设置",
      key: `${appMeta.seq}.knowledge.confidence`,
      label: "政策匹配置信阈值",
      value: "0.85",
      valueType: "number",
      enabled: true,
      description: `${appMeta.title}在自动匹配政策条目时的最低置信度要求。`,
      updatedBy: "演示管理员",
    },
    {
      group: "问答服务",
      key: `${appMeta.seq}.sla.hours`,
      label: "高优先级响应时限",
      value: "4",
      valueType: "number",
      enabled: true,
      description: `${appMeta.title}高优先级咨询的响应时限，单位为小时。`,
      updatedBy: "演示管理员",
    },
    {
      group: "通知设置",
      key: `${appMeta.seq}.notice.owner`,
      label: "责任人提醒",
      value: "开启",
      valueType: "select",
      enabled: true,
      description: "状态流转后提醒责任岗位复核处理进度。",
      updatedBy: "演示管理员",
    },
    {
      group: "智能服务",
      key: `${appMeta.seq}.ai.enabled`,
      label: appMeta.aiTitle,
      value: "开启",
      valueType: "boolean",
      enabled: true,
      description: `允许在${appMeta.aiTitle}中发起智能问答与岗位化推荐。`,
      updatedBy: "演示管理员",
    },
  ];
}

function governanceAuditLogs(now: Date) {
  return [
    {
      module: "用户管理",
      action: "初始化用户",
      targetType: "管理用户",
      targetName: `${appMeta.shortName}负责人`,
      result: "成功",
      actor: "演示管理员",
      summary: `${appMeta.department}已初始化业务负责人、党务专员和审计复核岗。`,
      createdAt: now,
    },
    {
      module: "系统设置",
      action: "初始化设置",
      targetType: "业务参数",
      targetName: "政策匹配置信阈值",
      result: "成功",
      actor: "演示管理员",
      summary: `${appMeta.title}知识参数、服务阈值和智能问答开关已就绪。`,
      createdAt: new Date(now.getTime() - 30 * 60 * 1000),
    },
  ];
}

async function ensureGovernanceData() {
  const now = new Date();
  const [userCount, settingCount, auditCount] = await Promise.all([
    prisma.systemUser.count(),
    prisma.systemSetting.count(),
    prisma.auditLog.count(),
  ]);

  if (userCount === 0) {
    await prisma.systemUser.createMany({ data: governanceUsers(now) });
  }
  if (settingCount === 0) {
    await prisma.systemSetting.createMany({ data: governanceSettings() });
  }
  if (auditCount === 0) {
    await prisma.auditLog.createMany({ data: governanceAuditLogs(now) });
  }
}

export async function ensureSeedData() {
  const count = await prisma.investModel.count();
  if (count === 0) {
    const now = new Date();
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdItems: Array<{
        id: string;
        title: string;
        category: string;
        status: string;
        owner: string;
        riskLevel: string;
        sourceBatch: string;
      }> = [];

      for (const record of seedRecords) {
        const item = await tx.investModel.create({
          data: {
            code: record.code,
            title: record.title,
            modelType: record.modelType,
            industry: record.industry,
            region: record.region,
            status: record.status,
            priority: record.priority,
            riskLevel: record.riskLevel,
            owner: record.owner,
            analyst: record.owner,
            description: record.description,
            inputParams: "",
            outputResult: "",
            prediction: "",
            source: record.source,
            sourceType: record.sourceType,
            sourceTitle: record.sourceTitle,
            sourceBatch: record.sourceBatch,
            dueDate: new Date(now.getTime() + record.dueDateOffsetDays * 24 * 60 * 60 * 1000),
          },
        });

        await tx.modelEvent.createMany({
          data: [
            {
              modelId: item.id,
              sourceType: item.sourceType,
              sourceTitle: item.sourceTitle,
              action: "创建知识条目",
              actor: item.owner,
              content: `来自${item.sourceType}《${item.sourceTitle}》：${record.modelType}已创建，等待质检与发布。`,
            },
            {
              modelId: item.id,
              sourceType: item.sourceType,
              sourceTitle: item.sourceTitle,
              action: "智能问答建议",
              actor: appMeta.aiTitle,
              content: `来自${item.sourceType}《${item.sourceTitle}》：业务领域为${record.industry}，适用范围为${record.region}，服务优先级${item.riskLevel}，已生成首轮问答建议。`,
            },
          ],
        });

        createdItems.push({
          id: item.id,
          title: item.title,
          category: item.modelType,
          status: item.status,
          owner: item.owner,
          riskLevel: item.riskLevel,
          sourceBatch: item.sourceBatch,
        });
      }

      await tx.insight.createMany({ data: [...seedInsights] });
      await tx.integrationLog.createMany({ data: getMockIntegrationHealth() });
      await tx.aiDraft.createMany({
        data: createSeedAiDrafts(createdItems),
      });
    });
  }

  await ensureGovernanceData();
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  await ensureSeedData();

  const [items, events, insights, integrations, aiDrafts, systemUsers, auditLogs, systemSettings] = await Promise.all([
    prisma.investModel.findMany({ orderBy: [{ updatedAt: "desc" }] }),
    prisma.modelEvent.findMany({ orderBy: [{ createdAt: "desc" }], take: 12 }),
    prisma.insight.findMany({ orderBy: [{ createdAt: "desc" }] }),
    prisma.integrationLog.findMany({ orderBy: [{ createdAt: "desc" }] }),
    prisma.aiDraft.findMany({ orderBy: [{ createdAt: "desc" }], take: 24 }),
    prisma.systemUser.findMany({ orderBy: [{ updatedAt: "desc" }] }),
    prisma.auditLog.findMany({ orderBy: [{ createdAt: "desc" }], take: 80 }),
    prisma.systemSetting.findMany({ orderBy: [{ group: "asc" }, { updatedAt: "desc" }] }),
  ]);

  const aiDraftViews = aiDrafts.map((draft: (typeof aiDrafts)[number]) => ({
    ...draft,
    sourceMode: draft.sourceMode as "glm" | "local",
    savedAt: toIso(draft.savedAt),
    createdAt: draft.createdAt.toISOString(),
  }));

  const conversationAccumulator = new Map<string, AiConversationView>();
  for (const draft of aiDraftViews) {
    const existing = conversationAccumulator.get(draft.conversationId);
    if (!existing) {
      conversationAccumulator.set(draft.conversationId, {
        id: draft.conversationId,
        topic: draft.topic,
        businessObjectId: draft.businessObjectId,
        businessObjectType: draft.businessObjectType,
        businessObjectTitle: draft.businessObjectTitle,
        resultType: draft.resultType,
        sourceSummary: draft.sourceSummary,
        latestStatus: draft.status,
        saveStatus: draft.saveStatus,
        lastPrompt: draft.prompt,
        turnCount: 1,
        updatedAt: draft.createdAt,
      });
      continue;
    }

    existing.turnCount += 1;
  }

  return {
    items: items.map((item: (typeof items)[number]) => ({
      ...item,
      category: item.modelType,
      dueDate: toIso(item.dueDate),
      updatedAt: item.updatedAt.toISOString(),
    })),
    events: events.map((event: (typeof events)[number]) => ({
      ...event,
      itemId: event.modelId,
      createdAt: event.createdAt.toISOString(),
    })),
    insights,
    integrations: integrations.map((log: (typeof integrations)[number]) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
    aiDrafts: aiDraftViews,
    aiConversations: Array.from(conversationAccumulator.values()).sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    systemUsers: systemUsers.map((user: (typeof systemUsers)[number]) => ({
      ...user,
      lastLoginAt: toIso(user.lastLoginAt),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })),
    auditLogs: auditLogs.map((log: (typeof auditLogs)[number]) => ({
      ...log,
      createdAt: log.createdAt.toISOString(),
    })),
    systemSettings: systemSettings.map((setting: (typeof systemSettings)[number]) => ({
      ...setting,
      createdAt: setting.createdAt.toISOString(),
      updatedAt: setting.updatedAt.toISOString(),
    })),
  };
}

export async function getRouteSnapshot(): Promise<DashboardSnapshot> {
  return getDashboardSnapshot();
}
