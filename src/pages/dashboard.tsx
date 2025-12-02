import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, DollarSign, TrendingDown, Calendar, Plus } from "lucide-react";
import { OverviewChart } from "../components/dashboard/overViewChart";
import { RecentExpenses } from "../components/dashboard/recentExpenses";
import { ExpenseDialog } from "../components/dashboard/editUpdateExpenseDialog";
import { DeleteExpenseDialog } from "../components/dashboard/deleteExpenseDialog";
import { expenseService, type Expense } from "@/services/expense";
import { toast } from "sonner";

export function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [_loading, setLoading] = useState(true);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [expenseToDeleteId, setExpenseToDeleteId] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  async function loadData() {
    setLoading(true);
    try {
      const data = await expenseService.getAll();
      setExpenses(data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleLogout() {
    localStorage.removeItem("access_token");
    toast.info("Logged out successfully");
    navigate("/login");
  }

  function handleCreate() {
    setSelectedExpense(null);
    setIsCreateDialogOpen(true);
  }

  function handleEdit(expense: Expense) {
    setSelectedExpense(expense);
    setIsCreateDialogOpen(true);
  }

  function handleDeleteClick(id: number) {
    setExpenseToDeleteId(id);
    setIsDeleteDialogOpen(true);
  }

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const highestExpense = expenses.reduce(
    (max, curr) => Math.max(max, curr.amount),
    0
  );
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-lg">
              <Zap size={24} fill="currentColor" className="text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Dashboard
              </h1>
              <p className="text-muted-foreground">Overview of your finances</p>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-none"
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              className="flex-1 md:flex-none bg-zinc-900 hover:bg-zinc-800 text-white"
              onClick={handleCreate}
            >
              <Plus className="mr-2 h-4 w-4" /> New Expense
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expenses
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">Total accumulated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Highest Expense
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(highestExpense)}
              </div>
              <p className="text-xs text-muted-foreground">
                Single largest transaction
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expenses.length}</div>
              <p className="text-xs text-muted-foreground">Entries found</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Monthly expenses for {currentYear}
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <OverviewChart data={expenses} />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>
                Manage your latest transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentExpenses
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <ExpenseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        expenseToEdit={selectedExpense}
        onSuccess={loadData}
      />

      <DeleteExpenseDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        expenseId={expenseToDeleteId}
        onSuccess={loadData}
      />
    </div>
  );
}
