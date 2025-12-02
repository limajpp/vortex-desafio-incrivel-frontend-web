import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";
import { expenseService } from "@/services/expense";
import { toast } from "sonner";

interface DeleteExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expenseId: number | null;
  onSuccess: () => void;
}

export function DeleteExpenseDialog({
  open,
  onOpenChange,
  expenseId,
  onSuccess,
}: DeleteExpenseDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!expenseId) return;

    setIsLoading(true);
    try {
      await expenseService.delete(expenseId);

      toast.success("Expense deleted successfully");

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete expense. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center gap-2 sm:items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:hidden">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <AlertTriangle className="hidden h-5 w-5 text-red-600 sm:block" />
            Delete Expense
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this expense? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
