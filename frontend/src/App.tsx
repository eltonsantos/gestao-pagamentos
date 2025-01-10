import Modal from 'react-modal';
import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./components/DefaultLayout";
import { PrivateRoute } from "./routes/private.routes";
import { Login } from "./components/Login";
import { ListSeller } from "./components/ListSeller";
import { Checkout } from "./components/Checkout";
import { Payment } from "./components/Payment";
import { Home } from "./components/Home";
import { CreateSeller } from "./components/CreateSeller";
import { EditSeller } from "./components/EditSeller";

Modal.setAppElement('#root');

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sellers" element={<ListSeller />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/create-seller" element={<CreateSeller />} />
          <Route path="/edit-seller/:id" element={<EditSeller />} />
        </Route>
      </Route>
    </Routes>
  );
}