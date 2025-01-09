import { Navigate, Outlet } from 'react-router-dom';

function PublicRoutes() {

  const currentUser = true;

  return currentUser ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes;