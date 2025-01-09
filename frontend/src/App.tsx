import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./components/DefaultLayout";
import { PrivateRoute } from "./routes/private.routes";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Checkout } from "./components/Checkout";
import { Payment } from "./components/Payment";
import { FormSeller } from "./components/FormSeller";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/register-seller" element={<FormSeller />} />
        </Route>
      </Route>
    </Routes>
  );
}