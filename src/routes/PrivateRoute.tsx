import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
