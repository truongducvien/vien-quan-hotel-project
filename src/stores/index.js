// Lưu tất cả những global state (redux, ...)import { configureStore } from "@reduxjs/toolkit";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { bookingReducer } from "../admin-src/store/slices/bookingSlice";
import { roomReducer } from "../admin-src/store/slices/roomSlice";
import { mySaga } from "./sagas";
import { bookingHomeReducer } from "./slices/booking.slice";
import { fetchBookingIdReducer } from "./slices/fetchBookingId.slice";
import { postBookingReducer } from "./slices/postBooking.slice";
import { promoCodeReducer } from "./slices/promoCode.slice";
import { roomHomeReducer } from "./slices/room.slice";
import { roomPaginationReducer } from "./slices/roomPagination.slice";
import { userReducer } from "./slices/user.slice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = {
  user: userReducer,
  room: roomHomeReducer,
  booking: bookingHomeReducer,
  bookingInfo: postBookingReducer,
  promoCode: promoCodeReducer,
  fetchBookingId: fetchBookingIdReducer,
  roomPagination: roomPaginationReducer,
  roomReducer: roomReducer,
  bookingReducer: bookingReducer,
};

export const appStore = configureStore({
  reducer: rootReducer,
  // Value nhận vào là list các middleware
  // getDefaultMiddleware để ta trả về các middleware sẵn có trong redux
  // và nối với middleware vừa tạo là saga-middleware
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    ...middleware,
  ],
});

sagaMiddleware.run(mySaga);
