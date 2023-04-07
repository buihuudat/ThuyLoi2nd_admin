import axiosClient from "./axiosClient";

const userApi = {
  get: (payload) => axiosClient.get(`/user/${payload._id}`),
  update: (payload) => axiosClient.put(`/user/${payload._id}`, payload),
  updateAvatar: (payload) =>
    axiosClient.put(`/user/update-avatar/${payload._id}`, payload),
  delete: (payload) => axiosClient.delete(`/user/${payload._id}`, payload),
  gets: () => axiosClient.get("user"),
};

export default userApi;
