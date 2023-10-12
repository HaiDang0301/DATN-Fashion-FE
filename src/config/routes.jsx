const routesConfig = {
  //  User
  home: "/",
  register: "/auth/register",
  login: "/auth/login",
  forgetpw: "/auth/forget-password",
  resetpw: "/auth/reset-password/:token",
  blogs: "/blogs",
  blogDetail: "/blogs/:slug",
  Profile: "/user/profile",
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
};
export default routesConfig;
