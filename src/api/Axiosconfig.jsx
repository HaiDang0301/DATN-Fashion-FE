import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const axiosConfig = axios.create({
  // baseURL: "https://fashion-be-bmuu.onrender.com/",
  baseURL: "http://localhost:5050",
  headers: { token: token },
});
export default axiosConfig;
