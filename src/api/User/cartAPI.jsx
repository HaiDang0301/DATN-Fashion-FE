import axiosConfig from "../Axiosconfig";

const cartAPI = {
  index(token) {
    const url = "/api/user/carts";
    return axiosConfig.get(url, { headers: { token: token } });
  },
  store(data) {
    const url = "/api/user/carts";
    return axiosConfig.post(url, data);
  },
  destroy(data) {
    const url = "/api/user/carts";
    return axiosConfig.delete(url, { data });
  },
  orders(data) {
    const url = "/api/user/carts/orders";
    return axiosConfig.post(url, data);
  },
};
export default cartAPI;
