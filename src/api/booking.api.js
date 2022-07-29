import { API, URL_API } from "./const.api";

export const FetchBookingHomeAPI = () => API.get(`${URL_API}/bookings`);

export const PostBookingAPI = (data) => API.post(`${URL_API}/bookings`, data);

export const FetchBookingIdAPI = (id) => {
  const queryParam = `?userInfo.id=${id}`;

  return API.get(`${URL_API}/bookings${queryParam}`);
};

export const FetchBookingAvailableAPI = () =>
  API.get(`${URL_API}/bookings?status=Booked`);

export const PatchBookingStatusAPI = (id, data) => {
  return API.patch(`${URL_API}/bookings`, `${id}`, data);
};
