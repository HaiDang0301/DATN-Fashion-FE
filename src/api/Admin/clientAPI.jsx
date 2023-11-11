import axiosConfig from "../Axiosconfig";
const clientAPI = {
  index(query) {
    const url = "/api/admin/clients";
    return axiosConfig.get(url, { params: query });
  },
};
export default clientAPI;
