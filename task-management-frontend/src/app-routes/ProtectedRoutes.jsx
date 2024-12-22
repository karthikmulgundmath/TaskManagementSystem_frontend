import { Navigate, Outlet } from "react-router-dom";
import Layout from "../pages/layout/layout";

const ProtectedRoutes = () => {
  const authToken = localStorage.getItem("authToken");

  return authToken ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
