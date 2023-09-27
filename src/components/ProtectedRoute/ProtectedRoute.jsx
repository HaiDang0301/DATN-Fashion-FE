import { Navigate } from "react-router-dom";
import routesConfig from "../../config/routes";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
const token = localStorage.getItem("token");
const ProtectedRoute = ({ children }) => {
  var decoded = null;
  if (token) {
    decoded = jwt_decode(token);
  } else {
    decoded = sessionStorage.getItem("token");
  }
  if (decoded.role === "admin") {
    return children;
  } else {
    toast.error("Không có quyền truy cập", {
      position: "bottom-right",
      autoClose: 5000,
      theme: "light",
    });
    return <Navigate to={routesConfig.home}></Navigate>;
  }
};
export default ProtectedRoute;
