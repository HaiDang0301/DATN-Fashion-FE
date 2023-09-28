const routesConfig = {
  //  User
  home: "/",
  register: "/auth/register",
  login: "/auth/login",
  forgetpw: "/auth/forget-password",
  resetpw: "/auth/reset-password/:token",
  blogs: "/blogs",
  blogDetail: "/blogs/:slug",
  //Admin
  AdminHome: "/admin/home",
  AdminBlogs: "/admin/blogs",
  CreateBlogs: "/admin/blogs/create",
  UpdateBlogs: "/admin/blogs/:id/edit",
};
export default routesConfig;
