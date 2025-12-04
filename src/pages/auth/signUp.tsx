import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { authService } from "../../services/auth";
import { toast } from "sonner";
import { removeEmojis } from "@/lib/utils";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | string[]>("");

  const navigate = useNavigate();

  const passwordRequirements = useMemo(() => {
    return [
      { label: "At least 8 characters", valid: password.length >= 8 },
      { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(password) },
      { label: "At least 1 lowercase letter", valid: /[a-z]/.test(password) },
      { label: "At least 1 number", valid: /[0-9]/.test(password) },
      { label: "At least 1 symbol", valid: /[^A-Za-z0-9]/.test(password) },
    ];
  }, [password]);

  const isPasswordStrong = passwordRequirements.every((req) => req.valid);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isPasswordStrong) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.register(name, email, password);
      toast.success("Account created successfully! Please sign in.");
      navigate("/login");
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to create account.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Create an account
        </h1>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Enter your information to get started
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-md border border-red-200 animate-in slide-in-from-top-2">
                {Array.isArray(error) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {error.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{error}</p>
                )}
              </div>
            )}

            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="font-bold text-zinc-700 dark:text-zinc-200"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                value={name}
                onChange={(e) => setName(removeEmojis(e.target.value))}
                className="h-11 font-medium bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700"
                required
              />
            </div>

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
              <Label
                htmlFor="password"
                className="font-bold text-zinc-700 dark:text-zinc-200"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="create a strong password"
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

              <div className="space-y-1.5 pt-1">
                <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                  Password must contain:
                </p>
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs transition-colors duration-200"
                  >
                    {req.valid ? (
                      <Check size={14} className="text-emerald-600 font-bold" />
                    ) : (
                      <X size={14} className="text-zinc-400 font-bold" />
                    )}
                    <span
                      className={
                        req.valid
                          ? "text-emerald-700 dark:text-emerald-400 font-bold"
                          : "text-zinc-500 dark:text-zinc-500 font-medium"
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="h-11 w-full mt-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-bold"
              disabled={isLoading || !isPasswordStrong}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </div>
        </form>

        <div className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300 underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
