import axiosConfig from "./Axiosconfig";

const AuthsAPI = {
  register(data) {
    const url = "/api/auth/register";
    return axiosConfig.post(url, data);
  },
  login(data) {
    const url = "/api/auth/login";
    return axiosConfig.post(url, data);
  },
};
export default AuthsAPI;
