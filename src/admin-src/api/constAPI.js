import axios from "axios";

export const API_URL = "http://localhost:3050/api";

export const API = {
  get: (url) => axios.get(url),
  post: (url, data) => axios.post(url, data),
  patch: (url, id, data) => axios.patch(`${url}/${id}`, data),
  delete: (url, id) => axios.delete(`${url}/${id}`),
};
