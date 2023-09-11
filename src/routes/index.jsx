import Home from "../pages/User/Home/Home";
import routesConfig from "../config/routes";
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
  },
];
const privateRoutes = [
];
export { publicRoutes, privateRoutes };
