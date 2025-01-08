import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Checkout } from "./components/Checkout";
import { Payment } from "./components/Payment";
import { RegisterSeller } from "./components/RegisterSeller";

export function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payments" element={<Payment />} />
              <Route path="/register-seller" element={<RegisterSeller />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
