import { API, URL_API } from "./const.api";

export const RoomAPI = API.get(`${URL_API}/rooms`);
export const RoomSortAscAPI = API.get(
  `${URL_API}/rooms?_sort=price&_order=asc`
);
