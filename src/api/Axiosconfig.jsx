import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const axiosConfig = axios.create({
  baseURL: process.env.HTTP_Server,
  headers: { token: token },
});
export default axiosConfig;
