import { Login } from "@/components/ui/login";
import { Zap, CircleDollarSign } from "lucide-react";

function App() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/50 to-zinc-900/0" />

        <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-800/50 border border-white/10 shadow-2xl backdrop-blur-sm transition-transform hover:scale-105 duration-500">
              <Zap
                size={48}
                fill="currentColor"
                className="text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
              />
            </div>

            <div className="h-2 w-2 rounded-full bg-zinc-700" />

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-800/50 border border-white/10 shadow-2xl backdrop-blur-sm transition-transform hover:scale-105 duration-500 delay-100">
              <CircleDollarSign
                size={48}
                className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-6xl font-bold tracking-tighter text-white drop-shadow-xl">
              Expenzeus
            </h1>
            <p className="text-lg text-zinc-400 tracking-widest uppercase font-medium">
              Financial Control
            </p>
          </div>
        </div>
      </div>

      <div className="lg:p-8 flex h-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default App;
