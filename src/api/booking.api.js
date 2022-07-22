import { API, URL_API } from "./const.api";

export const BookingAPI = {
  getBooking: API.get(`${URL_API}/bookings`),
  post: (data) => API.post(`${URL_API}/bookings`, data),
};
