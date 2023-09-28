import axiosConfig from "../Axiosconfig";
const blogAPI = {
  getAll(params) {
    const url = "/api/admin/blogs";
    return axiosConfig.get(url, { params: params });
  },
  createBlog(data) {
    const url = "/api/admin/blogs";
    return axiosConfig.post(url, data);
  },
  editBlog(id) {
    const url = `/api/admin/blogs/${id}/edit`;
    return axiosConfig.get(url);
  },
  updateBlog(id, data) {
    const url = `/api/admin/blogs/${id}`;
    return axiosConfig.put(url, data);
  },
  deleteBlog(id) {
    const url = `/api/admin/blogs/${id}`;
    return axiosConfig.delete(url);
  },
};
export default blogAPI;
