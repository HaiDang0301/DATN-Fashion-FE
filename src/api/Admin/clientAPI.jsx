import axiosConfig from "../Axiosconfig";
const clientAPI = {
  index(params) {
    const url = "/api/admin/clients";
    return axiosConfig.get(url, { params: params });
  },
};
export default clientAPI;
