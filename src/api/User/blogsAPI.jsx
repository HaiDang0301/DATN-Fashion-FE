import axiosConfig from "../Axiosconfig";

const blogAPI = {
  getAll(params) {
    const url = "/api/blogs";
    return axiosConfig.get(url, { params: params });
  },
  showDetail(params) {
    const url = `/api/blog/${params}`;
    return axiosConfig.get(url);
  },
};
export default blogAPI;
