import axiosConfig from "../Axiosconfig";

const bannerApi = {
  index() {
    const url = "/api/admin/banners";
    return axiosConfig.get(url);
  },
  store(data) {
    const url = "/api/admin/banners";
    return axiosConfig.post(url, data);
  },
  edit(id) {
    const url = `/api/admin/banners/${id}/edit`;
    return axiosConfig.get(url);
  },
  update(id, data) {
    const url = `/api/admin/banners/${id}`;
    return axiosConfig.put(url, data);
  },
  delete(id) {
    const url = `/api/admin/banners/${id}`;
    return axiosConfig.delete(url);
  },
};
export default bannerApi;
