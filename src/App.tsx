import { Login } from "@/components/ui/login";
import { Zap, CircleDollarSign } from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-200 to-zinc-300 p-4 dark:from-zinc-800 dark:to-zinc-950">
      <div className="mb-6 flex animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/30 px-6 py-4 shadow-xl backdrop-blur-md dark:bg-black/30 dark:border-white/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 shadow-md text-white dark:bg-zinc-100 dark:text-zinc-900">
            <Zap
              size={20}
              fill="currentColor"
              className="text-yellow-400 dark:text-yellow-500"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tighter text-zinc-800 dark:text-zinc-100">
            Expenzeus
          </h1>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 shadow-md text-white dark:bg-zinc-100 dark:text-zinc-900">
            <CircleDollarSign size={20} className="text-green-500" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500">
        <Login />
      </div>
    </div>
  );
}

export default App;
