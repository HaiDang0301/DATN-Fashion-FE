import axiosConfig from "../Axiosconfig";
const producersApi = {
  getAll(params) {
    const url = "/api/admin/producers";
    return axiosConfig.get(url, { params: params });
  },
  createProducer(data) {
    const url = "/api/admin/producers";
    return axiosConfig.post(url, data);
  },
  editProducer(id) {
    const url = `/api/admin/producers/${id}/edit`;
    return axiosConfig.get(url);
  },
  updateProducer(id, data) {
    const url = `/api/admin/producers/${id}`;
    return axiosConfig.put(url, data);
  },
  deleteProducer(id) {
    const url = `/api/admin/producers/${id}`;
    return axiosConfig.delete(url);
  },
};
export default producersApi;
