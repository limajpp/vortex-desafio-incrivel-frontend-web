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
import {
  Zap,
  DollarSign,
  TrendingDown,
  Calendar,
  Plus,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { OverviewChart } from "../components/dashboard/overViewChart";
import { RecentExpenses } from "../components/dashboard/recentExpenses";
import { ExpenseDialog } from "../components/dashboard/createEditExpenseDialog";
import { DeleteExpenseDialog } from "../components/dashboard/deleteExpenseDialog";
import { LogoutDialog } from "../components/dashboard/logoutDialog";
import { expenseService, type Expense } from "@/services/expense";
import { toast } from "sonner";
import { useTheme } from "@/components/themeProvider";

export function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [_loading, setLoading] = useState(true);

  const { theme, setTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

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
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function handleLogoutClick() {
    setIsLogoutDialogOpen(true);
  }

  function confirmLogout() {
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
    <div className="min-h-screen w-full bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-yellow-500/30">
      <div className="hidden dark:block absolute top-[-10%] left-[50%] -translate-x-1/2 w-[40%] h-[30%] rounded-full bg-yellow-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-md p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-2xl transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 ring-1 ring-yellow-400/50">
                <Zap size={28} fill="currentColor" className="drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Expenzeus
                </h1>
                <p className="text-zinc-700 dark:text-zinc-300 font-bold text-sm mt-1">
                  Financial Control Panel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="outline"
                className="flex-1 md:flex-none border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
                onClick={handleLogoutClick}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>

              <Button
                className="flex-1 md:flex-none bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02]"
                onClick={handleCreate}
              >
                <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> New Expense
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg hover:border-yellow-500/50 transition-all duration-300 group relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  Total Expenses
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <DollarSign className="h-5 w-5 text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 stroke-[2.5px]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2 tracking-tight">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(totalExpenses)}
                </div>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                  Accumulated total
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg hover:border-yellow-500/50 transition-all duration-300 group relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  Highest Expense
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <TrendingDown className="h-5 w-5 text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 stroke-[2.5px]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2 tracking-tight">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(highestExpense)}
                </div>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                  Single largest transaction
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg hover:border-yellow-500/50 transition-all duration-300 group relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors">
                  Total Transactions
                </CardTitle>
                <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                  <Calendar className="h-5 w-5 text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 stroke-[2.5px]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-2 tracking-tight">
                  {expenses.length}
                </div>
                <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mt-1">
                  Records found
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
                  Overview
                </CardTitle>
                <CardDescription className="font-semibold text-zinc-600 dark:text-zinc-400">
                  Monthly expenses for {currentYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart data={expenses} isDarkMode={isDark} />
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-zinc-900 dark:text-white">
                  Recent Expenses
                </CardTitle>
                <CardDescription className="font-semibold text-zinc-600 dark:text-zinc-400">
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

        <LogoutDialog
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
          onConfirm={confirmLogout}
        />
      </div>
    </div>
  );
}
