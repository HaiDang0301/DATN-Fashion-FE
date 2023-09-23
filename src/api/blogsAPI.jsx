import axiosConfig from "./Axiosconfig";

const blogAPI = {
  getAll(params) {
    const url = "/blogs";
    return axiosConfig.get(url, { params: params });
  },
  showDetail(params) {
    const url = `/blogs/${params}`;
    return axiosConfig.get(url);
  },
  createBlog(data) {
    const url = "/blogs";
    return axiosConfig.post(url, data);
  },
  editBlog(id) {
    const url = `/blogs/${id}/edit`;
    return axiosConfig.get(url);
  },
  updateBlog(id, data) {
    const url = `/blogs/${id}`;
    return axiosConfig.put(url, data);
  },
  deleteBlog(id) {
    const url = `/blogs/${id}`;
    return axiosConfig.delete(url);
  },
};
export default blogAPI;
