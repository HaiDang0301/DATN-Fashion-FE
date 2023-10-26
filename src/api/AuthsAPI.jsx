import axiosConfig from "./Axiosconfig";

const AuthsAPI = {
  profile(token) {
    const url = "/api/auth/profile";
    return axiosConfig.get(url, { headers: { token: token } });
  },
  update(data) {
    const url = "/api/auth/profile";
    return axiosConfig.put(url, data);
  },
  register(data) {
    const url = "/api/auth/register";
    return axiosConfig.post(url, data);
  },
  verify(params) {
    const url = `/api/auth/verify/${params}`;
    return axiosConfig.post(url);
  },
  newsletter() {
    const url = `/api/auth/newsletter`;
    return axiosConfig.post(url);
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
