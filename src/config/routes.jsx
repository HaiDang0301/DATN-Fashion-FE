const routesConfig = {
  //  User
  home: "/",
  register: "/auth/register",
  verify: "/auth/verify/:token",
  login: "/auth/login",
  forgetpw: "/auth/forget-password",
  resetpw: "/auth/reset-password/:token",
  blogs: "/blogs",
  blogDetail: "/blogs/:slug",
  Profile: "/account/profile",
  Products: "/collections/:type?/:category?",
  ProductDetail: "/collections/:type?/:category?/products/:slug",
  CartDetail: "/my-cart",
  Orders: "/my-orders",
  OrdersDetail: "/my-orders/:id",
  Contacts: "/about/contacts",
  //Admin
  AdminHome: "/admin/home",
  AdminBlogs: "/admin/blogs",
  CreateBlogs: "/admin/blogs/create",
  UpdateBlogs: "/admin/blogs/:id/edit",
  AdminProducers: "/admin/producers",
  CreateProducers: "/admin/producers/create",
  UpdateProducers: "/admin/producers/:id/edit",
  AdminProducts: "/admin/products",
  CreateProducts: "/admin/products/create",
  UpdateProducts: "/admin/products/:id/edit",
  AdminBanners: "/admin/banners",
  CreateBanners: "/admin/banners/create",
  UpdateBanners: "/admin/banners/:id/edit",
  AdminOrders: "/admin/orders",
  ViewOrders: "/admin/orders/:id",
  Statistical: "/admin/statistical",
  AdminClients: "/admin/clients",
};
export default routesConfig;
