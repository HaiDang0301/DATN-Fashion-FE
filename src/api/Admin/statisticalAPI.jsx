import axiosConfig from "../Axiosconfig";

const statisticalApi = {
  getDate(query) {
    const url = "api/admin/statistical/date";
    return axiosConfig.get(url, { params: query });
  },
  index(query) {
    const url = "api/admin/statistical";
    return axiosConfig.get(url, { params: query });
  },
};
export default statisticalApi;
