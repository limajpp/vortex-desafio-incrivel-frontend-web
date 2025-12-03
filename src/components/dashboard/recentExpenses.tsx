import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import type { Expense } from "@/services/expense";

interface RecentExpensesProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
}

export function RecentExpenses({
  expenses,
  onEdit,
  onDelete,
}: RecentExpensesProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800">
            <TableHead className="font-extrabold text-zinc-900 dark:text-white">
              Description
            </TableHead>
            <TableHead className="font-extrabold text-zinc-900 dark:text-white">
              Date
            </TableHead>
            <TableHead className="text-right font-extrabold text-zinc-900 dark:text-white">
              Amount
            </TableHead>
            <TableHead className="w-[100px] text-right font-extrabold text-zinc-900 dark:text-white">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="h-24 text-center font-bold text-zinc-600 dark:text-zinc-400"
              >
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow
                key={expense.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
              >
                <TableCell className="font-bold text-zinc-800 dark:text-zinc-100">
                  {expense.description}
                </TableCell>

                <TableCell className="font-bold text-zinc-700 dark:text-zinc-300">
                  {formatDate(expense.date)}
                </TableCell>

                <TableCell className="text-right font-extrabold text-red-600 dark:text-red-400">
                  - {formatCurrency(expense.amount)}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-600 hover:text-blue-700 hover:bg-blue-100 dark:text-zinc-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 transition-colors"
                      onClick={() => onEdit(expense)}
                    >
                      <Pencil size={16} className="stroke-[2.5px]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-600 hover:text-red-700 hover:bg-red-100 dark:text-zinc-400 dark:hover:text-red-300 dark:hover:bg-red-900/30 transition-colors"
                      onClick={() => onDelete(expense.id)}
                    >
                      <Trash2 size={16} className="stroke-[2.5px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
