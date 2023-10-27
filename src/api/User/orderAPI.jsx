import axiosConfig from "../Axiosconfig";

const orderAPI = {
  index(token) {
    const url = "/api/user/carts/orders";
    return axiosConfig.get(url, { headers: { token: token } });
  },
  show(id) {
    const url = `/api/user/carts/orders/${id}`;
    return axiosConfig.get(url);
  },
};
export default orderAPI;
