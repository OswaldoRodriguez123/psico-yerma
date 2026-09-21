"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = [
  "#c3b4e0",
  "#a98fd6",
  "#8f76c9",
  "#d8c9ef",
  "#7a6bb0",
  "#b9c7e8",
];

type Datum = { label: string; value: number };

export function DonutChart({ data }: { data: Datum[] }) {
  if (data.length === 0) {
    return <p className="text-sm text-ink-soft">Aún no hay datos.</p>;
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.label} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--brand-border)",
              background: "var(--brand-surface)",
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
