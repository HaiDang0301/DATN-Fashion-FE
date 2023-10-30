import axios from "axios";
const axiosConfig = axios.create({
  baseURL: process.env.HTTP_Server,
});
axiosConfig.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : sessionStorage.getItem("token");
  config.headers["token"] = token;
  return config;
});
export default axiosConfig;
