import axiosConfig from "../Axiosconfig";

const cartAPI = {
  index(token) {
    const url = "/api/user/carts";
    return axiosConfig.get(url, { headers: { token: token } });
  },
  store(data, token) {
    const url = "/api/user/carts";
    return axiosConfig.post(url, data, { headers: { token: token } });
  },
  destroy(data, token) {
    const url = "/api/user/carts";
    return axiosConfig.delete(url, { data, headers: { token: token } });
  },
  orders(data) {
    const url = "/api/user/carts/orders";
    return axiosConfig.post(url, data);
  },
};
export default cartAPI;
