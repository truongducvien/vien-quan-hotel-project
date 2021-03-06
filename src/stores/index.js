// Lưu tất cả những global state (redux, ...)import { configureStore } from "@reduxjs/toolkit";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "./sagas";
import { bookingReducer } from "./slices/bookingsSlice";
import { promotionReducer } from "./slices/promotionsSlice";
import { roomReducer } from "./slices/roomsSlice";
import { userReducer } from "./slices/UserSlice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const rootReducer = {
  user: userReducer,
  room: roomReducer,
  booking: bookingReducer,
  promotion: promotionReducer,
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
