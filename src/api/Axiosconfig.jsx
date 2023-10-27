import axios from "axios";
const token = localStorage.getItem("token") || sessionStorage.getItem("token");
const axiosConfig = axios.create({
  // baseURL: "https://fashion-be-bmuu.onrender.com/",
  baseURL: process.env.HTTP_Server,
  headers: { token: token },
});
console.log(import.meta.env.HTTP_Server);
export default axiosConfig;
