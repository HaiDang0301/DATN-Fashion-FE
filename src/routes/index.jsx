import Home from "../pages/User/Home/Home";
import routesConfig from "../config/routes";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminBlogs from "../pages/Admin/Blogs/Blogs";
import CreateBlogs from "../pages/Admin/Blogs/Create/CreateBlogs";
import UpdateBlogs from "../pages/Admin/Blogs/Update/Update";
import Blogs from "../pages/User/Blogs/Blog";
import BlogDetail from "../pages/User/Blogs/Detail/BlogDetail";
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
  },
  {
    path: routesConfig.blogs,
    component: Blogs,
  },
  {
    path: routesConfig.blogDetail,
    component: BlogDetail,
  },
];
const privateRoutes = [
  {
    path: routesConfig.AdminHome,
    component: AdminHome,
  },
  {
    path: routesConfig.AdminBlogs,
    component: AdminBlogs,
  },
  {
    path: routesConfig.CreateBlogs,
    component: CreateBlogs,
  },
  {
    path: routesConfig.UpdateBlogs,
    component: UpdateBlogs,
  },
];
export { publicRoutes, privateRoutes };
