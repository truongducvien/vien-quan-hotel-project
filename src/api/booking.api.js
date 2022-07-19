import { API, URL_API } from "./const.api";

export const BookingAPI = API.get(`${URL_API}/bookings`);

export const BookingSortAscAPI = API.get(
  `${URL_API}/bookings?_sort=price&_order=asc`
);
