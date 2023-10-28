import axiosConfig from "../Axiosconfig";

const ordersAPI = {
  index() {
    const url = "/api/admin/orders";
    return axiosConfig.get(url);
  },
  show(id) {
    const url = `/api/admin/orders/${id}`;
    return axiosConfig.get(url);
  },
  update(data) {
    const url = `/api/admin/orders`;
    return axiosConfig.put(url, data);
  },
};
export default ordersAPI;
