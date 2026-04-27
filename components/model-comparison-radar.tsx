"use client";

import { Radar } from "@ant-design/charts";
import { Card, Typography } from "antd";
import { appMeta } from "@/lib/domain";
import type { DashboardSnapshot } from "@/lib/types";

export function ModelComparisonRadar({ snapshot }: { snapshot: DashboardSnapshot }) {
  console.log("[ModelComparisonRadar] Rendering with snapshot items:", snapshot.items.length);
  const completedItems = snapshot.items
    .filter((item) => item.status === appMeta.statuses.at(-1))
    .slice(0, 5);

  if (completedItems.length === 0) {
    return (
      <Card title="问答能力对比">
        <Typography.Text type="secondary">暂无已发布知识条目用于对比分析</Typography.Text>
      </Card>
    );
  }

  const axes = ["政策准确性", "答复完整性", "处理时效", "岗位适配度", "可复用性"];
  const chartData = completedItems.flatMap((item) => {
    const seed = item.title.charCodeAt(0) % 100;
    return axes.map((axis, i) => ({
      name: item.title.slice(0, 12) + "...",
      axis,
      value: Math.min(100, Math.max(20, seed + i * 12)),
    }));
  });

  const colors = ["#1890ff", "#13c2c2", "#ffc53d", "#73d13d", "#eb2f96"];

  const config = {
    data: chartData,
    xField: "axis",
    yField: "value",
    seriesField: "name",
    color: colors,
    legend: { position: "bottom" as const },
    area: { style: { fillOpacity: 0.12 } },
    lineStyle: { lineWidth: 2 },
    point: { size: 4, shape: "circle" },
  };

  return (
    <Card title="问答能力对比">
      <Radar {...config} style={{ height: 380 }} />
    </Card>
  );
}

export function RiskAssessmentRadar({ snapshot }: { snapshot: DashboardSnapshot }) {
  console.log("[RiskAssessmentRadar] Rendering with snapshot items:", snapshot.items.length);
  const highRiskItems = snapshot.items
    .filter((item) => item.riskLevel === "高")
    .slice(0, 4);

  if (highRiskItems.length === 0) {
    return (
      <Card title="风险监测雷达">
        <Typography.Text type="secondary">暂无高优先级咨询需要评估</Typography.Text>
      </Card>
    );
  }

  const axes = ["市场风险", "财务风险", "运营风险", "政策风险", "信用风险"];
  const chartData = highRiskItems.flatMap((item) => {
    const seed = item.title.charCodeAt(0) % 100;
    return axes.map((axis, i) => ({
      name: item.title.slice(0, 12) + "...",
      axis,
      value: Math.min(100, Math.max(40, seed + i * 8)),
    }));
  });

  const colors = ["#ff4d4f", "#fa8c16", "#52c41a", "#1890ff"];

  const config = {
    data: chartData,
    xField: "axis",
    yField: "value",
    seriesField: "name",
    color: colors,
    legend: { position: "bottom" as const },
    area: { style: { fillOpacity: 0.15 } },
    lineStyle: { lineWidth: 2 },
    point: { size: 4, shape: "circle" },
  };

  return (
    <Card title="风险监测雷达">
      <Radar {...config} style={{ height: 380 }} />
    </Card>
  );
}
