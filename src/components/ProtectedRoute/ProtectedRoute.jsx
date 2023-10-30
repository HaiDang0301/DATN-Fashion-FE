import { Navigate } from "react-router-dom";
import routesConfig from "../../config/routes";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to={routesConfig.login}></Navigate>;
  } else {
    var decoded = jwt_decode(token);
    if (decoded && decoded.role === "admin") {
      return children;
    } else {
      toast.error("Không có quyền truy cập", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
      return <Navigate to={routesConfig.home}></Navigate>;
    }
  }
};
export default ProtectedRoute;
