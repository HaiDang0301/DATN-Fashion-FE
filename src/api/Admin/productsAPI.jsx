import axiosConfig from "../Axiosconfig";

const productsAPI = {
  getAll(params) {
    const url = "/api/admin/products";
    return axiosConfig.get(url, { params: params });
  },
  store(data) {
    const url = "/api/admin/products";
    return axiosConfig.post(url, data);
  },
  importExcel(data) {
    const url = "/api/admin/products/importExcel";
    return axiosConfig.post(url, data);
  },
  downloadFile() {
    const url = "/api/admin/products/download/sampleFile";
    return axiosConfig.get(url, { responseType: "blob" });
  },
  edit(id) {
    const url = `/api/admin/products/${id}/edit`;
    return axiosConfig.get(url);
  },
  update(id, data) {
    const url = `/api/admin/products/${id}`;
    return axiosConfig.put(url, data);
  },
  destroy(id) {
    const url = `/api/admin/products/${id}`;
    return axiosConfig.delete(url);
  },
};
export default productsAPI;
