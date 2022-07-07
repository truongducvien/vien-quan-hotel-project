import { API, URL_API } from "./const.api";

export const RoomAPI = {
  room: (data) => API.post(`${URL_API}/auth/room`, data),
};
