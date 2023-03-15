import axiosClient from "./axiosClient";

const productApi = {
  create: (payload) => axiosClient.post("post", payload),
  update: (payload) => axiosClient.put("post", payload),
  delete: (payload) => axiosClient.post("post", payload),
  get: (payload) => axiosClient.post(`post/${payload._id}`, payload),
  gets: () => axiosClient.get("post"),
};

export default productApi;
