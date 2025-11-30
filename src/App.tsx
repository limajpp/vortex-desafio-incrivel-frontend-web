import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./components/auth/signIn";
import { SignUp } from "./components/auth/signUp";
import { AuthLayout } from "./components/layouts/authLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
