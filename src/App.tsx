import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./components/auth/signIn";
import { SignUp } from "./components/auth/signUp";
import { AuthLayout } from "./components/layouts/authLayout";
import { Dashboard } from "./pages/dashboard";
import { PrivateRoute, PublicRoute } from "./components/auth/authGuard";

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
    </BrowserRouter>
  );
}

export default App;
