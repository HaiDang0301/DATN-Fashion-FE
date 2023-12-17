import axiosConfig from "../Axiosconfig";

const cartAPI = {
  index() {
    const url = "/api/user/carts";
    return axiosConfig.get(url);
  },
  store(data) {
    const url = "/api/user/carts";
    return axiosConfig.post(url, data);
  },
  destroy(product_id) {
    const url = `/api/user/carts/${product_id}`;
    return axiosConfig.delete(url);
  },
  orders(data) {
    const url = "/api/user/carts/orders";
    return axiosConfig.post(url, data);
  },
  payment(data) {
    const url = "/api/user/carts/orders/payment";
    return axiosConfig.post(url, data);
  },
};
export default cartAPI;
