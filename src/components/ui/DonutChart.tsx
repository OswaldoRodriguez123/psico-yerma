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
  "#a78bda", // lavanda
  "#6ec1b3", // verde agua
  "#f0a58f", // durazno
  "#f2cf7a", // amarillo suave
  "#7fa8de", // azul
  "#e79ab0", // rosa
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
