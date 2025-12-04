import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authService } from "../../services/auth";
import { toast } from "sonner";
import { removeEmojis } from "@/lib/utils";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await authService.signIn(email, password);
      localStorage.setItem("access_token", data.access_token);
      toast.success("Login successful! Redirecting...");
      navigate("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Invalid email or password";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Enter your credentials to access the dashboard
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="font-bold text-zinc-700 dark:text-zinc-200"
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(removeEmojis(e.target.value))}
                className="h-11 font-medium bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="font-bold text-zinc-700 dark:text-zinc-200"
                >
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="type your password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={password}
                  onChange={(e) => setPassword(removeEmojis(e.target.value))}
                  className="h-11 pr-10 font-medium bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                className="h-11 w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>

              <Button
                variant="outline"
                className="h-11 w-full font-bold border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                type="button"
                asChild
                disabled={isLoading}
              >
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
