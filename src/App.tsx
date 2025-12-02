import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/auth/signIn";
import { SignUp } from "./pages/auth/signUp";
import { AuthLayout } from "./components/layouts/authLayout";
import { Dashboard } from "./pages/dashboard";
import { PrivateRoute, PublicRoute } from "./components/guards/authGuard";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
