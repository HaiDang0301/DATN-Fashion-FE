import axiosConfig from "../Axiosconfig";
const producersApi = {
  index(params) {
    const url = "/api/admin/producers";
    return axiosConfig.get(url, { params: params });
  },
  create(data) {
    const url = "/api/admin/producers";
    return axiosConfig.post(url, data);
  },
  edit(id) {
    const url = `/api/admin/producers/${id}/edit`;
    return axiosConfig.get(url);
  },
  update(id, data) {
    const url = `/api/admin/producers/${id}`;
    return axiosConfig.put(url, data);
  },
  destroy(id) {
    const url = `/api/admin/producers/${id}`;
    return axiosConfig.delete(url);
  },
};
export default producersApi;
