import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  )
}
