import { useAuth } from "../contexts/AuthContext";

export function Home() {
  const { userEmail } = useAuth();

  return (
    <h1 className="text-3xl">
      Olá, bem vindo <span className="text-orange-600"><b>{userEmail}</b></span>
      <br /><br />
      ao sistema <b>Gestão de pagamentos</b>
    </h1>
  )
}