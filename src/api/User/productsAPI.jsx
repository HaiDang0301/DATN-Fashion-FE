import axiosConfig from "../Axiosconfig";

const productsAPI = {
  index(params, query) {
    const url = `/api/collections/${params}`;
    return axiosConfig.get(url, { params: query });
  },
  show(slug) {
    const url = `/api/collections/products/${slug}`;
    return axiosConfig.get(url);
  },
};
export default productsAPI;
