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
};
export default blogAPI;
