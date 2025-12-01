import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExpenseItem {
  id: string;
  description: string;
  amount: string;
  date: string;
}

const recentExpenses: ExpenseItem[] = [
  {
    id: "1",
    description: "Supermercado",
    amount: "R$ 450,00",
    date: "2023-10-25",
  },
  { id: "2", description: "Netflix", amount: "R$ 55,90", date: "2023-10-24" },
  { id: "3", description: "Uber", amount: "R$ 24,90", date: "2023-10-23" },
  { id: "4", description: "Academia", amount: "R$ 120,00", date: "2023-10-20" },
  { id: "5", description: "Ifood", amount: "R$ 89,90", date: "2023-10-18" },
];

export function RecentExpenses() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                {expense.description}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {expense.date}
              </TableCell>
              <TableCell className="text-right font-medium text-red-500">
                - {expense.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
