import { API, URL_API } from "./const.api";

export const RoomPaginationAPI = {
  fetchRoomPagination: (page, limit) => {
    const queryParam = `?_page=${page}&_limit=${limit}`;

    return API.get(`${URL_API}/rooms${queryParam}`);
  },
};
