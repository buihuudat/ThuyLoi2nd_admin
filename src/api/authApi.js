import axiosClient from "./axiosClient";

const authApi = {
  login: (payload) => axiosClient.post("auth/login", payload),
  verifyToken: () => axiosClient.post("auth/check-auth"),
};

export default authApi;
