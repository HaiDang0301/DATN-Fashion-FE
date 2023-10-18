import Home from "../pages/User/Home/Home";
import routesConfig from "../config/routes";
import AdminHome from "../pages/Admin/Home/AdminHome";
import AdminBlogs from "../pages/Admin/Blogs/Blogs";
import CreateBlogs from "../pages/Admin/Blogs/Create/CreateBlogs";
import UpdateBlogs from "../pages/Admin/Blogs/Update/Update";
import Blogs from "../pages/User/Blogs/Blog";
import BlogDetail from "../pages/User/Blogs/Detail/BlogDetail";
import Register from "../pages/Auth/Register/Register";
import Login from "../pages/Auth/Login/Login";
import ForgetPw from "../pages/Auth/Forget/Forget";
import ResetPw from "../pages/Auth/Reset/Reset";
import AdminProducers from "../pages/Admin/Producers/Producers";
import CreateProducers from "../pages/Admin/Producers/Create/CreateProducers";
import UpdateProducers from "../pages/Admin/Producers/Update/Update";
import AdminProducts from "../pages/Admin/Products/Products";
import CreateProducts from "../pages/Admin/Products/Create/CreateProducts";
import UpdateProducts from "../pages/Admin/Products/Update/UpdateProducts";
import Profile from "../pages/User/Profile/Profile";
import AdminBanners from "../pages/Admin/Banners/Banners";
import CreateBanners from "../pages/Admin/Banners/Create/CreateBanners";
import UpdateBanners from "../pages/Admin/Banners/Update/Update";
import Products from "../pages/User/Products/Products";
import ProductDetail from "../pages/User/ProductDetail/ProductDetail";
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
  {
    path: routesConfig.register,
    component: Register,
    layout: null,
  },
  {
    path: routesConfig.login,
    component: Login,
    layout: null,
  },
  {
    path: routesConfig.forgetpw,
    component: ForgetPw,
    layout: null,
  },
  {
    path: routesConfig.resetpw,
    component: ResetPw,
    layout: null,
  },
  {
    path: routesConfig.Profile,
    component: Profile,
  },
  {
    path: routesConfig.Products,
    component: Products,
  },
  {
    path: routesConfig.ProductDetail,
    component: ProductDetail,
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
  {
    path: routesConfig.AdminProducers,
    component: AdminProducers,
  },
  {
    path: routesConfig.CreateProducers,
    component: CreateProducers,
  },
  {
    path: routesConfig.UpdateProducers,
    component: UpdateProducers,
  },
  {
    path: routesConfig.AdminProducts,
    component: AdminProducts,
  },
  {
    path: routesConfig.CreateProducts,
    component: CreateProducts,
  },
  {
    path: routesConfig.UpdateProducts,
    component: UpdateProducts,
  },
  {
    path: routesConfig.AdminBanners,
    component: AdminBanners,
  },
  {
    path: routesConfig.CreateBanners,
    component: CreateBanners,
  },
  {
    path: routesConfig.UpdateBanners,
    component: UpdateBanners,
  },
];
export { publicRoutes, privateRoutes };
