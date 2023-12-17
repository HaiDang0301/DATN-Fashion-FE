import axiosConfig from "../Axiosconfig";
const blogAPI = {
  index(params) {
    const url = "/api/admin/blogs";
    return axiosConfig.get(url, { params: params });
  },
  create(data) {
    const url = "/api/admin/blogs";
    return axiosConfig.post(url, data);
  },
  edit(id) {
    const url = `/api/admin/blogs/${id}/edit`;
    return axiosConfig.get(url);
  },
  update(id, data) {
    const url = `/api/admin/blogs/${id}`;
    return axiosConfig.put(url, data);
  },
  delete(id) {
    const url = `/api/admin/blogs/${id}`;
    return axiosConfig.delete(url);
  },
};
export default blogAPI;
