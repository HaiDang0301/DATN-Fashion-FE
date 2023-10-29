import axiosConfig from "../Axiosconfig";

const ordersAPI = {
  index(token, params) {
    const url = "/api/user/carts/orders";
    return axiosConfig.get(url, { params: params, headers: { token: token } });
  },
  show(id, token) {
    const url = `/api/user/carts/orders/${id}`;
    return axiosConfig.get(url, { headers: { token: token } });
  },
};
export default ordersAPI;
