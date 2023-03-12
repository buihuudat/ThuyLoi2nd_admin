import axiosClient from "./axiosClient";

const userApi = {
  update: (payload) => axiosClient.put(`/user/${payload._id}`, payload),
  updateAvatar: (payload) =>
    axiosClient.put(`/user/update-avatar/${payload._id}`, payload),
  delete: (payload) => axiosClient.post(`/user/${payload._id}`, payload),
  get: (payload) => axiosClient.post(`/user/${payload._id}`, payload),
  getAll: () => axiosClient.get("user"),
};

export default userApi;
