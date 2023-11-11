import axiosConfig from "../Axiosconfig";

const blogAPI = {
  index(params) {
    const url = "/api/blogs";
    return axiosConfig.get(url, { params: params });
  },
  show(params) {
    const url = `/api/blog/${params}`;
    return axiosConfig.get(url);
  },
};
export default blogAPI;
