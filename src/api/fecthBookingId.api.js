import { API, URL_API } from "./const.api";

export const FetchBookingIdAPI = {
  fetchBookingId: (id) => {
    const queryParam = `?userInfo.id=${id}`;

    return API.get(`${URL_API}/bookings${queryParam}`);
  },
};
