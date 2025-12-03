import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { expenseService, type Expense } from "@/services/expense";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenseToEdit?: Expense | null;
  onSuccess: () => void;
}

const MAX_AMOUNT = 99999999.99;

export function ExpenseDialog({
  open,
  onOpenChange,
  expenseToEdit,
  onSuccess,
}: ExpenseDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (expenseToEdit) {
        setDescription(expenseToEdit.description);
        setAmount(expenseToEdit.amount.toString());
        setDate(expenseToEdit.date.split("T")[0]);
      } else {
        setDescription("");
        setAmount("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    }
  }, [open, expenseToEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const numericAmount = Number(amount);

    if (numericAmount > MAX_AMOUNT) {
      toast.error(
        `Amount cannot exceed R$ ${MAX_AMOUNT.toLocaleString("pt-BR")}`
      );
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        description,
        amount: numericAmount,
        date: date,
      };

      if (expenseToEdit) {
        await expenseService.update(expenseToEdit.id, payload);
        toast.success("Expense updated successfully!");
      } else {
        await expenseService.create(payload);
        toast.success("Expense created successfully!");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to save expense.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white">
            {expenseToEdit ? "Edit Expense" : "New Expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label
              htmlFor="description"
              className="font-bold text-zinc-700 dark:text-zinc-300"
            >
              Description
            </Label>
            <Input
              id="description"
              placeholder="Ex: Grocery, Uber..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 focus-visible:ring-yellow-500"
              required
              maxLength={255}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="amount"
                className="font-bold text-zinc-700 dark:text-zinc-300"
              >
                Amount (R$)
              </Label>
              <Input
                id="amount"
                type="number"
                min="0.00"
                max={MAX_AMOUNT}
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 focus-visible:ring-yellow-500"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="date"
                className="font-bold text-zinc-700 dark:text-zinc-300"
              >
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-700 focus-visible:ring-yellow-500"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-6 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
