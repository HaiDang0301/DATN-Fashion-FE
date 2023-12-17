import axiosConfig from "../Axiosconfig";
const homeAPI = {
  showCollection() {
    const url = "/api/user/home/showCollection";
    return axiosConfig.get(url);
  },
  newProduct() {
    const url = "/api/collections/new-products";
    return axiosConfig.get(url);
  },
  special() {
    const url = "/api/user/home/products/special";
    return axiosConfig.get(url);
  },
};
export default homeAPI;
