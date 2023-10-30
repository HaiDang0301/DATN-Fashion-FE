import axiosConfig from "../Axiosconfig";

const ordersAPI = {
  index(params) {
    const url = "/api/user/carts/orders";
    return axiosConfig.get(url, { params: params });
  },
  show(id) {
    const url = `/api/user/carts/orders/${id}`;
    return axiosConfig.get(url);
  },
};
export default ordersAPI;
