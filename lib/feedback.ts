export function createFeedback(category: string) {
  return `${category}已创建并进入党务知识库`;
}

export function advanceFeedback(status: string) {
  return `处理状态已推进至${status}，服务留痕已更新`;
}

export function deleteFeedback(category: string) {
  return `${category}记录已删除，相关统计已刷新`;
}

export function aiFeedback(source: "glm" | "local") {
  return source === "glm" ? "智能问答建议已生成，可继续追问或直接采纳" : "本地问答初稿已生成，可补充追问后再采纳";
}
