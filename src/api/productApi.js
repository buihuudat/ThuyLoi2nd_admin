import axiosClient from "./axiosClient";

const productApi = {
  create: (payload) => axiosClient.post("post_product/create", payload),
  update: (payload) => axiosClient.put("post_product/update", payload),
  delete: (payload) => axiosClient.post("post_product/delete", payload),
  get: (payload) => axiosClient.post("post_product/get", payload),
  getAll: () => axiosClient.get("post_product/getAll"),
};

export default productApi;
