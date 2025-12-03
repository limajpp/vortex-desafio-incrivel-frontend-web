import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutDialog({
  open,
  onOpenChange,
  onConfirm,
}: LogoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <DialogHeader className="flex flex-col items-center gap-2 sm:items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 sm:hidden">
            <LogOut className="h-6 w-6 text-zinc-900 dark:text-white" />
          </div>
          <DialogTitle className="flex items-center gap-2 text-xl font-extrabold text-zinc-900 dark:text-white">
            <LogOut className="hidden h-5 w-5 text-zinc-900 dark:text-white sm:block stroke-[2.5px]" />
            Sign Out
          </DialogTitle>
          <DialogDescription className="text-center sm:text-left text-base font-semibold text-zinc-700 dark:text-zinc-300">
            Are you sure you want to sign out? You will need to enter your
            credentials again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            className="font-bold border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold"
            onClick={onConfirm}
          >
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
