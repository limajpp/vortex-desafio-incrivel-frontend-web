import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Expense } from "@/services/expense";

interface OverviewChartProps {
  data: Expense[];
  isDarkMode?: boolean;
  year: number;
}

export function OverviewChart({
  data,
  isDarkMode = false,
  year,
}: OverviewChartProps) {
  const chartData = useMemo(() => {
    const months = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    data.forEach((expense) => {
      if (!expense.date) return;

      const dateStr = expense.date.toString();
      const [expenseYearStr, expenseMonthStr] = dateStr.split("-");

      const expenseYear = Number(expenseYearStr);
      const expenseMonthIndex = Number(expenseMonthStr) - 1;

      if (expenseYear === year) {
        months[expenseMonthIndex].total += Number(expense.amount);
      }
    });

    return months;
  }, [data, year]);

  const axisColor = isDarkMode ? "#e4e4e7" : "#18181b";

  const formatYAxis = (value: number) => {
    if (value >= 1000000000) return `R$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `R$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `R$${(value / 1000).toFixed(0)}k`;
    return `R$${value}`;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke={axisColor}
          fontSize={12}
          fontWeight={700}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke={axisColor}
          fontSize={12}
          fontWeight={700}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatYAxis}
          width={80}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#09090b",
            fontWeight: "bold",
            fontSize: "14px",
          }}
          formatter={(value: number) => [
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value),
            "Total",
          ]}
        />
        <Bar
          dataKey="total"
          fill="#eab308"
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
