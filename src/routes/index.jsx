import Home from "../pages/User/Home/Home";
import routesConfig from "../config/routes";
import AdminHome from "../pages/Admin/Home/AdminHome";
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
  },
];
const privateRoutes = [
  {
    path: routesConfig.AdminHome,
    component: AdminHome,
  },
];
export { publicRoutes, privateRoutes };
