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
}

export function OverviewChart({ data }: OverviewChartProps) {
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

    const currentYear = new Date().getFullYear();

    data.forEach((expense) => {
      const expenseDate = new Date(expense.date);

      if (expenseDate.getFullYear() === currentYear) {
        const monthIndex = expenseDate.getMonth();

        months[monthIndex].total += Number(expense.amount);
      }
    });

    return months;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$${value}`}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "#000",
          }}
          formatter={(value: number) => [`R$ ${value.toFixed(2)}`, "Total"]}
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
