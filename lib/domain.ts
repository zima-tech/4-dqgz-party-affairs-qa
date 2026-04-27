import type { AnalysisView, ConsoleRoute, DashboardSnapshot, RouteMetric, WorkspaceView, WorkItemInput } from "@/lib/types";

export const appMeta = {
  seq: "4",
  title: "党务工作智能问答助手",
  department: "党群工作部",
  shortName: "党务智答中枢",
  description: "面向党务政策解读、流程咨询、岗位学习推荐与知识更新治理的一体化智能工作台。",
  modules: ["结构化知识库构建", "7x24小时智能问答", "个性化知识推荐", "自动知识更新", "学习效果追踪"],
  statuses: ["待校验", "问答服务中", "推荐优化中", "已发布"],
  aiTitle: "党务智能问答助手",
  aiPrompt: "请结合当前知识条目和用户岗位，生成规范、可执行的党务问答建议。",
  integrations: ["党内法规文库", "组织流程手册", "历史问答记录", "政策更新订阅"],
  sourceObjectName: "党务知识条目",
  dataSourceTitle: "政策更新批次",
  aiExperience: {
    panelTag: "政策解读 / 流程答疑 / 岗位学习推荐",
    objectLabel: "当前知识条目",
    emptyTitle: "请选择知识条目后发起智能问答",
    emptyDescription: "系统会结合政策依据、流程模板和岗位画像输出规范答复，并给出关联学习资料推荐。",
    resultType: "党务问答建议",
    savedStatusLabel: "已采纳",
    saveActionLabel: "采纳问答建议",
    saveEventAction: "采纳问答建议",
    generateEventAction: "生成问答建议",
    savedSuccessText: "问答建议已采纳并同步到当前知识条目。",
    stepTitles: ["读取知识条目与岗位上下文", "核验政策版本与历史答复", "生成问答建议与推荐文件", "等待采纳并写入服务留痕"],
    focusAreas: ["政策依据", "流程步骤", "风险提示", "岗位适配", "关联学习资料", "推荐理由"],
    quickPrompts: [
      "请解释发展党员流程中的时间节点和注意事项。",
      "请针对支部组织委员岗位，推荐本周必学制度文件。",
      "请结合最新政策更新，给出一线党务咨询的标准答复模板。",
    ],
    resultFields: [
      { label: "问答主题", source: "category" },
      { label: "责任岗位", source: "owner" },
      { label: "服务优先级", source: "riskLevel" },
      { label: "处理状态", source: "status" },
    ],
  },
  prd: "4_党群工作部_党务工作智能问答助手_PRD.md",
  demand: "4_党群工作部_党务工作智能问答助手_MVP需求拆解.md",
} as const;

export const seedRecords = [
  {
    code: "DQ-2026-001",
    title: "《中国共产党纪律处分条例》常见问答库",
    modelType: "政策解读",
    industry: "纪律监督",
    region: "集团纪委",
    status: "问答服务中",
    priority: "P1",
    riskLevel: "高",
    owner: "纪检专员",
    analyst: "知识运营专员",
    description: "整合纪律处分相关高频问题，统一基层问答口径。",
    inputParams: "来源：条例条款、处分流程图、历史案例。",
    outputResult: "已形成违纪行为分类解释与处理流程答复模板。",
    prediction: "预计可覆盖本月65%的纪律咨询场景。",
    source: "党内法规文库",
    sourceType: "党务知识条目",
    sourceTitle: "纪律处分条例问答库-001",
    sourceBatch: "党纪政策更新·2026年第1批",
    dueDateOffsetDays: 4,
  },
  {
    code: "DQ-2026-002",
    title: "发展党员工作流程全链路指引",
    modelType: "流程指引",
    industry: "组织建设",
    region: "所属支部",
    status: "待校验",
    priority: "P1",
    riskLevel: "高",
    owner: "组织委员",
    analyst: "知识运营专员",
    description: "覆盖入党申请、培养考察、预备党员接收与转正全流程。",
    inputParams: "来源：组织工作手册、支部模板、审批时限规则。",
    outputResult: "已梳理关键表单与时限提醒节点。",
    prediction: "上线后可减少重复流程咨询约40%。",
    source: "组织流程手册",
    sourceType: "党务知识条目",
    sourceTitle: "发展党员流程指引-002",
    sourceBatch: "组织流程更新·2026年第1批",
    dueDateOffsetDays: 6,
  },
  {
    code: "DQ-2026-003",
    title: "党费收缴与使用政策问答专题",
    modelType: "政策解读",
    industry: "组织建设",
    region: "基层党组织",
    status: "推荐优化中",
    priority: "P2",
    riskLevel: "中",
    owner: "党务干事",
    analyst: "知识运营专员",
    description: "统一党费标准、减免规则、使用审批口径。",
    inputParams: "来源：党费管理规定、审计反馈、季度复盘清单。",
    outputResult: "完成12类常见问题标准化答案。",
    prediction: "预计咨询处理时长下降30%。",
    source: "党内法规文库",
    sourceType: "党务知识条目",
    sourceTitle: "党费政策问答-003",
    sourceBatch: "党费政策更新·2026年第2批",
    dueDateOffsetDays: 5,
  },
  {
    code: "DQ-2026-004",
    title: "三会一课组织执行案例库",
    modelType: "案例答疑",
    industry: "党员教育",
    region: "所属支部",
    status: "已发布",
    priority: "P2",
    riskLevel: "低",
    owner: "宣传委员",
    analyst: "学习运营专员",
    description: "沉淀三会一课典型场景答疑，支持快速检索与复用。",
    inputParams: "来源：优秀支部案例、年度学习计划、执行记录。",
    outputResult: "形成会前准备、过程记录、会后整改三段式模板。",
    prediction: "可支撑季度党建检查答复一致性。",
    source: "历史问答记录",
    sourceType: "党务知识条目",
    sourceTitle: "三会一课案例库-004",
    sourceBatch: "教育案例更新·2026年第1批",
    dueDateOffsetDays: 3,
  },
  {
    code: "DQ-2026-005",
    title: "主题党日活动策划与合规模板",
    modelType: "流程指引",
    industry: "党员教育",
    region: "基层党组织",
    status: "问答服务中",
    priority: "P2",
    riskLevel: "中",
    owner: "宣传委员",
    analyst: "学习运营专员",
    description: "覆盖计划申报、活动组织、资料归档、效果复盘。",
    inputParams: "来源：活动模板库、基层反馈、党建考核项。",
    outputResult: "已沉淀活动合规清单与过程留痕样例。",
    prediction: "预计活动策划咨询满意度提升至90%。",
    source: "组织流程手册",
    sourceType: "党务知识条目",
    sourceTitle: "主题党日模板-005",
    sourceBatch: "教育流程更新·2026年第2批",
    dueDateOffsetDays: 8,
  },
  {
    code: "DQ-2026-006",
    title: "党支部换届选举操作指引",
    modelType: "流程指引",
    industry: "组织建设",
    region: "集团党委",
    status: "待校验",
    priority: "P1",
    riskLevel: "高",
    owner: "组织部专员",
    analyst: "知识运营专员",
    description: "明确换届启动、候选人提名、选举程序与报批材料。",
    inputParams: "来源：换届政策、历次选举材料、监督检查意见。",
    outputResult: "已输出换届关键节点与风险提示模板。",
    prediction: "可减少流程错误提报约50%。",
    source: "党内法规文库",
    sourceType: "党务知识条目",
    sourceTitle: "换届选举指引-006",
    sourceBatch: "组织制度更新·2026年第3批",
    dueDateOffsetDays: 7,
  },
  {
    code: "DQ-2026-007",
    title: "党内政治生活常见问题解析",
    modelType: "政策解读",
    industry: "组织建设",
    region: "所属支部",
    status: "推荐优化中",
    priority: "P3",
    riskLevel: "中",
    owner: "支部书记",
    analyst: "知识运营专员",
    description: "针对组织生活会、民主评议党员等场景提供规范解释。",
    inputParams: "来源：党章党规、组织生活指引、监督抽查清单。",
    outputResult: "已生成多岗位差异化答复模板。",
    prediction: "预计可提升基层制度执行一致性。",
    source: "党内法规文库",
    sourceType: "党务知识条目",
    sourceTitle: "政治生活问答-007",
    sourceBatch: "党内制度更新·2026年第2批",
    dueDateOffsetDays: 9,
  },
  {
    code: "DQ-2026-008",
    title: "党建宣传素材使用规范问答",
    modelType: "案例答疑",
    industry: "宣传统战",
    region: "基层党组织",
    status: "已发布",
    priority: "P3",
    riskLevel: "低",
    owner: "宣传干事",
    analyst: "学习运营专员",
    description: "统一宣传素材选用、引用、审核与发布口径。",
    inputParams: "来源：宣传管理制度、素材库、合规审核记录。",
    outputResult: "形成图文视频素材审核问答清单。",
    prediction: "可显著降低宣传合规风险。",
    source: "历史问答记录",
    sourceType: "党务知识条目",
    sourceTitle: "宣传素材规范-008",
    sourceBatch: "宣传规范更新·2026年第1批",
    dueDateOffsetDays: 10,
  },
  {
    code: "DQ-2026-009",
    title: "党务公开事项清单与发布流程",
    modelType: "流程指引",
    industry: "宣传统战",
    region: "集团党委",
    status: "问答服务中",
    priority: "P2",
    riskLevel: "中",
    owner: "党务公开专员",
    analyst: "知识运营专员",
    description: "规范党务公开内容边界、审批流程与时效要求。",
    inputParams: "来源：公开目录、审批规则、季度抽检结果。",
    outputResult: "完成公开事项发布流程图与模板集合。",
    prediction: "可减少公开口径差异投诉。",
    source: "组织流程手册",
    sourceType: "党务知识条目",
    sourceTitle: "党务公开流程-009",
    sourceBatch: "公开流程更新·2026年第2批",
    dueDateOffsetDays: 6,
  },
  {
    code: "DQ-2026-010",
    title: "党员教育培训学时管理答疑",
    modelType: "案例答疑",
    industry: "党员教育",
    region: "所属支部",
    status: "推荐优化中",
    priority: "P2",
    riskLevel: "中",
    owner: "教育培训专员",
    analyst: "学习运营专员",
    description: "覆盖学习计划、学时认定、补学机制与考核口径。",
    inputParams: "来源：培训制度、学习平台日志、考核台账。",
    outputResult: "已完成岗位化学习路径与答复模板。",
    prediction: "有助于提升党员学习自主性与完成率。",
    source: "历史问答记录",
    sourceType: "党务知识条目",
    sourceTitle: "学时管理答疑-010",
    sourceBatch: "教育管理更新·2026年第3批",
    dueDateOffsetDays: 11,
  },
  {
    code: "DQ-2026-011",
    title: "组织关系转接办理规范问答",
    modelType: "政策解读",
    industry: "组织建设",
    region: "基层党组织",
    status: "待校验",
    priority: "P1",
    riskLevel: "高",
    owner: "组织关系管理员",
    analyst: "知识运营专员",
    description: "统一线上线下组织关系转接流程与材料要求。",
    inputParams: "来源：转接制度、办理平台流程、投诉工单。",
    outputResult: "已输出跨区域转接专项答复模板。",
    prediction: "预计能显著降低重复咨询和退件率。",
    source: "政策更新订阅",
    sourceType: "党务知识条目",
    sourceTitle: "组织关系转接问答-011",
    sourceBatch: "组织关系更新·2026年第1批",
    dueDateOffsetDays: 5,
  },
  {
    code: "DQ-2026-012",
    title: "基层党组织考核指标解释库",
    modelType: "政策解读",
    industry: "纪律监督",
    region: "集团党委",
    status: "已发布",
    priority: "P2",
    riskLevel: "低",
    owner: "考核专员",
    analyst: "学习运营专员",
    description: "拆解党建考核指标定义、评分口径与整改建议。",
    inputParams: "来源：年度考核办法、通报材料、整改案例。",
    outputResult: "已形成考核问答词条和整改建议模板。",
    prediction: "支持支部按岗定制学习计划。",
    source: "政策更新订阅",
    sourceType: "党务知识条目",
    sourceTitle: "考核指标解释库-012",
    sourceBatch: "考核政策更新·2026年第2批",
    dueDateOffsetDays: 12,
  },
] as const;

export const seedInsights = [
  { title: "重复咨询压降率", value: "38%", trend: "up", level: "success" },
  { title: "高频问题即时命中率", value: "92%", trend: "steady", level: "warning" },
  { title: "岗位化学习推荐采纳率", value: "67%", trend: "down", level: "processing" },
] as const;

export const consoleRoutes: ConsoleRoute[] = [
  {
    key: "dashboard",
    slug: "dashboard",
    path: "/dashboard",
    title: "工作台首页",
    description: "聚合知识条目规模、服务效率与问答留痕。",
    kind: "dashboard",
  },
  {
    key: "knowledge-base",
    slug: "knowledge-base",
    path: "/knowledge-base",
    title: "知识库构建",
    description: "整合政策文件、操作流程与典型案例形成结构化知识条目。",
    kind: "workspace",
  },
  {
    key: "qa-operations",
    slug: "qa-operations",
    path: "/qa-operations",
    title: "问答服务运营",
    description: "管理7x24小时问答任务，跟踪状态推进与服务质量。",
    kind: "workspace",
  },
  {
    key: "recommendations",
    slug: "recommendations",
    path: "/recommendations",
    title: "个性化推荐",
    description: "基于岗位画像和历史记录输出学习推荐与策略分析。",
    kind: "analysis",
  },
  {
    key: "assistant",
    slug: "assistant",
    path: "/assistant",
    title: appMeta.aiTitle,
    description: "通过自然语言生成标准答复、推荐文件与处理建议。",
    kind: "assistant",
  },
  {
    key: "users",
    slug: "users",
    path: "/users",
    title: "用户管理",
    description: "维护党务系统用户、岗位角色与账号状态。",
    kind: "users",
  },
  {
    key: "audit-logs",
    slug: "audit-logs",
    path: "/audit-logs",
    title: "日志审计",
    description: "查看问答服务、推荐采纳、系统设置等操作留痕。",
    kind: "auditLogs",
  },
  {
    key: "settings",
    slug: "settings",
    path: "/settings",
    title: "系统设置",
    description: "维护服务SLA、推荐阈值与知识更新开关。",
    kind: "settings",
  },
] as const;

const workspaceFieldMap = {
  "knowledge-base": [
    { key: "title", label: "知识条目名称", placeholder: "例如：发展党员工作流程全链路指引", required: true },
    { key: "modelType", label: "条目类型", type: "select", options: ["政策解读", "流程指引", "案例答疑"], required: true },
    { key: "industry", label: "业务领域", type: "select", options: ["组织建设", "党员教育", "纪律监督", "宣传统战"], required: true },
    { key: "region", label: "适用范围", type: "select", options: ["集团党委", "所属支部", "基层党组织"], required: true },
    { key: "owner", label: "责任岗位", placeholder: "例如：组织委员", required: true },
    { key: "inputParams", label: "结构化摘要", type: "textarea", placeholder: "填写来源政策、关键流程和版本信息", required: true },
  ],
  "qa-operations": [
    { key: "title", label: "咨询主题", placeholder: "例如：组织关系转接材料不全如何处理", required: true },
    { key: "owner", label: "受理岗位", placeholder: "例如：组织关系管理员", required: true },
    { key: "riskLevel", label: "服务优先级", type: "select", options: ["高", "中", "低"], required: true },
    { key: "outputResult", label: "标准答复", type: "textarea", placeholder: "填写当前标准答复或处理口径", required: true },
    { key: "prediction", label: "推荐文件", type: "textarea", placeholder: "填写关联制度文件与学习建议", required: true },
  ],
} as const;

function routeMetrics(snapshot: DashboardSnapshot, rows = snapshot.items): RouteMetric[] {
  const finalStatus = appMeta.statuses.at(-1);
  const processingCount = rows.filter((item) => item.status !== finalStatus).length;
  const highPriority = rows.filter((item) => item.riskLevel === "高").length;
  const publishedCount = rows.filter((item) => item.status === finalStatus).length;

  return [
    { label: "知识条目", value: rows.length, helper: "当前页面可见条目数量", tone: "default" },
    { label: "高优先级", value: highPriority, helper: "需优先响应的党务咨询", tone: highPriority > 0 ? "danger" : "success" },
    { label: "处理中", value: processingCount, helper: "仍在问答服务或推荐优化的条目", tone: processingCount > 0 ? "warning" : "success" },
    { label: "已发布", value: publishedCount, helper: "已对外可用的标准问答知识", tone: "success" },
  ];
}

function sortedRows(rows: DashboardSnapshot["items"]) {
  return rows.slice().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

function byCategories(snapshot: DashboardSnapshot, categories: string[]) {
  return sortedRows(snapshot.items.filter((item) => categories.includes(item.category)));
}

export function getRouteBySlug(slug?: string) {
  const target = slug?.trim() ? slug : "dashboard";
  return consoleRoutes.find((route) => route.slug === target);
}

export function getRouteByKey(key: string) {
  return consoleRoutes.find((route) => route.key === key);
}

export function buildWorkItemInput(routeKey: string, values: Record<string, string>): WorkItemInput {
  if (routeKey === "knowledge-base") {
    const modelType = values.modelType || "政策解读";
    const industry = values.industry || "组织建设";
    const region = values.region || "所属支部";
    const title = values.title?.trim() || "待完善党务知识条目";

    return {
      title,
      category: modelType,
      owner: values.owner?.trim() || "党务专员",
      riskLevel: "中",
      description: `领域：${industry}；范围：${region}；类型：${modelType}。${values.inputParams?.trim() || "待补充结构化摘要。"}`,
    };
  }

  return {
    title: values.title?.trim() || "待处理党务咨询",
    category: "问答服务任务",
    owner: values.owner?.trim() || "党务值班专员",
    riskLevel: values.riskLevel || "中",
    description: `${values.outputResult?.trim() || "待补充标准答复。"} ${values.prediction?.trim() || "待补充推荐文件与学习建议。"}`.trim(),
  };
}

export function getWorkspaceView(routeKey: string, snapshot: DashboardSnapshot): WorkspaceView {
  if (routeKey === "knowledge-base") {
    const rows = byCategories(snapshot, ["政策解读", "流程指引", "案例答疑"]).slice(0, 12);
    return {
      title: "知识库构建",
      description: "整合政策文件、流程模板和案例问答，形成可检索的结构化知识条目。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新增知识条目",
      submitLabel: "创建知识条目",
      fields: [...workspaceFieldMap["knowledge-base"]],
      columns: [
        { key: "code", label: "条目编号", width: 140 },
        { key: "title", label: "条目名称", width: 280, kind: "summary" },
        { key: "modelType", label: "条目类型", width: 120, kind: "tag" },
        { key: "industry", label: "业务领域", width: 120 },
        { key: "region", label: "适用范围", width: 130 },
        { key: "status", label: "发布状态", width: 110, kind: "badge" },
      ],
      rows,
      emptyDescription: "暂无知识条目，请通过上方表单新增。",
      actions: [{ key: "advance", label: "推进发布", disabledWhenFinal: true }],
      timelineTitle: "知识治理流程",
      timeline: [
        { title: "内容入库", description: "整理政策条款、流程图和案例素材并完成字段标准化。" },
        { title: "规则校验", description: "核验版本有效性、适用岗位和风险提示。" },
        { title: "发布上线", description: "发布到问答服务并进入持续推荐优化。" },
      ],
    };
  }

  if (routeKey === "qa-operations") {
    const finalStatus = appMeta.statuses.at(-1);
    const rows = sortedRows(snapshot.items.filter((item) => item.status !== finalStatus)).slice(0, 12);
    return {
      title: "问答服务运营",
      description: "跟踪7x24小时问答任务状态，保障高频咨询及时响应与闭环。",
      metrics: routeMetrics(snapshot, rows),
      formTitle: "新增问答任务",
      submitLabel: "提交问答任务",
      fields: [...workspaceFieldMap["qa-operations"]],
      columns: [
        { key: "code", label: "任务编号", width: 140 },
        { key: "title", label: "咨询主题", width: 260, kind: "summary" },
        { key: "modelType", label: "任务类型", width: 130, kind: "tag" },
        { key: "status", label: "处理状态", width: 110, kind: "badge" },
        { key: "riskLevel", label: "优先级", width: 100, kind: "tag" },
        { key: "owner", label: "受理岗位", width: 130 },
      ],
      rows,
      emptyDescription: "暂无进行中的问答任务。",
      actions: [
        { key: "advance", label: "推进处理", disabledWhenFinal: true },
        {
          key: "delete",
          label: "删除",
          danger: true,
          confirmTitle: "确认删除该问答任务？",
          confirmText: "删除后将同步移除关联服务留痕，请确认当前任务无需继续。",
        },
      ],
      timelineTitle: "问答服务流程",
      timeline: [
        { title: "问题受理", description: "记录咨询背景、责任岗位和优先级。" },
        { title: "标准答复", description: "结合政策依据生成标准化答复。" },
        { title: "推荐学习", description: "按岗位推送关联文件和后续学习建议。" },
      ],
    };
  }

  const finalStatus = appMeta.statuses.at(-1);
  const rows = sortedRows(snapshot.items.filter((item) => item.status === finalStatus)).slice(0, 12);
  return {
    title: "已发布知识",
    description: "查看已发布的标准问答条目与推荐成果。",
    metrics: routeMetrics(snapshot, rows),
    columns: [
      { key: "code", label: "条目编号", width: 140 },
      { key: "title", label: "条目名称", width: 260, kind: "summary" },
      { key: "modelType", label: "条目类型", width: 130, kind: "tag" },
      { key: "industry", label: "业务领域", width: 120 },
      { key: "riskLevel", label: "服务优先级", width: 110, kind: "tag" },
      { key: "owner", label: "责任岗位", width: 130 },
    ],
    rows,
    emptyDescription: "当前暂无已发布知识条目。",
    timelineTitle: "发布动作留痕",
    timeline: snapshot.events
      .filter((event) => event.action.includes("采纳") || event.action.includes("发布"))
      .slice(0, 6)
      .map((event) => ({
        title: event.action,
        description: event.content,
        tag: event.sourceTitle,
      })),
  };
}

export function getAnalysisView(snapshot: DashboardSnapshot): AnalysisView {
  const categoryStats = snapshot.items.reduce((acc, item) => {
    const key = item.modelType || "其他";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryRows = Object.entries(categoryStats).map(([category, count]) => ({
    category,
    scope: count >= 4 ? "核心覆盖" : count >= 2 ? "稳定覆盖" : "待增强",
    total: String(count),
    trend: count >= 4 ? "咨询命中率高" : count >= 2 ? "持续优化中" : "建议补充条目",
  }));

  return {
    title: "个性化推荐",
    description: "按岗位与历史咨询行为分析知识覆盖情况，生成可执行的学习推荐策略。",
    metrics: routeMetrics(snapshot),
    highlights: [
      "组织建设与纪律监督问题占比高，建议优先补齐高频条目。",
      "高优先级咨询应绑定标准答复与学习资料，确保快速闭环。",
      "已发布条目可按岗位标签二次编排，支持自学内容定制。",
    ],
    tables: [
      {
        title: "知识类型覆盖统计",
        columns: [
          { key: "category", label: "知识类型" },
          { key: "scope", label: "覆盖等级" },
          { key: "total", label: "条目数量" },
          { key: "trend", label: "运营建议" },
        ],
        rows: categoryRows,
      },
      {
        title: "近期问答留痕",
        columns: [
          { key: "action", label: "动作" },
          { key: "content", label: "处理内容" },
          { key: "actor", label: "处理人" },
        ],
        rows: snapshot.events.slice(0, 6).map((event) => ({
          action: event.action,
          content: event.content,
          actor: event.actor,
        })),
      },
    ],
  };
}
