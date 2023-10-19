import axiosConfig from "./Axiosconfig";

const AuthsAPI = {
  profile() {
    const url = "/api/auth/profile";
    return axiosConfig.get(url);
  },
  register(data) {
    const url = "/api/auth/register";
    return axiosConfig.post(url, data);
  },
  login(data) {
    const url = "/api/auth/login";
    return axiosConfig.post(url, data);
  },
  forget(data) {
    const url = "/api/auth/forget-password";
    return axiosConfig.post(url, data);
  },
  reset(token, data) {
    const url = `/api/auth/reset-password/${token}`;
    return axiosConfig.post(url, data);
  },
};
export default AuthsAPI;
