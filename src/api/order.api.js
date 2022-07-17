import { API, URL_API } from "./const.api";

export const OrderAPI = API.get(`${URL_API}/orders`);

export const OrderSortAscAPI = API.get(
  `${URL_API}/orders?_sort=price&_order=asc`
);
