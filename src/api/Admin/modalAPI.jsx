import axiosConfig from "../Axiosconfig";
const modalAPI = {
  getAll(params) {
    const url = `/api/admin/${params}`;
    return axiosConfig.get(url);
  },
  store(params, data) {
    const url = `/api/admin/${params}`;
    return axiosConfig.post(url, data);
  },
  destroy(params, id) {
    const url = `/api/admin/${params}/${id}`;
    return axiosConfig.delete(url);
  },
  destroyCategory(params, id, data) {
    const url = `/api/admin/${params}/${id}`;
    return axiosConfig.delete(url, { data });
  },
};
export default modalAPI;
