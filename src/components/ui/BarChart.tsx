"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Datum = { label: string; value: number };

export function BarChart({ data }: { data: Datum[] }) {
  const chartData = data.map((item) => ({
    label: item.label,
    Contactos: item.value,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          margin={{ top: 8, right: 8, bottom: 0, left: -20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--brand-border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--brand-ink-soft)", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--brand-ink-soft)", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "var(--brand-primary-soft)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--brand-border)",
              background: "var(--brand-surface)",
            }}
          />
          <Bar
            dataKey="Contactos"
            fill="#a78bda"
            radius={[8, 8, 0, 0]}
            maxBarSize={48}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
