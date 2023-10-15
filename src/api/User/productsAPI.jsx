import axiosConfig from "../Axiosconfig";

const productsAPI = {
  index(params, query) {
    const url = `/api/products/collections/${params}`;
    return axiosConfig.get(url, { params: query });
  },
};
export default productsAPI;
