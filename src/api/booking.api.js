import { API, URL_API } from "./const.api";

export const BookingAPI = API.get(`${URL_API}/bookings`);

export const PostBookingAPI = (data) => API.post(`${URL_API}/bookings`, data);
