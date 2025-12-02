import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { authService } from "../../services/auth";
import { toast } from "sonner";

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
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to get started
        </p>
      </div>

      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200 animate-in slide-in-from-top-2">
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
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="create a strong password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Password must contain:
                </p>
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs transition-colors duration-200"
                  >
                    {req.valid ? (
                      <Check size={14} className="text-emerald-500" />
                    ) : (
                      <X size={14} className="text-muted-foreground/50" />
                    )}
                    <span
                      className={
                        req.valid
                          ? "text-emerald-600 font-medium"
                          : "text-muted-foreground"
                      }
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="h-11 w-full mt-2"
              disabled={isLoading || !isPasswordStrong}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
