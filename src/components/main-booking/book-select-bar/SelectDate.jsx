import React, { useContext, useEffect } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "../style/book-searchbar.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { fetchRoomAction } from "../../../stores/slices/room.slice";
import { fetchBookingAction } from "../../../stores/slices/bookingHome.slice";
import {
  availableRoomsFunction,
  filterObjQtyTypeRoomId,
  qtyTypeIdBookedFunction,
  soldOutIdFilterValue0,
  timeEndDay,
  timeStartDay,
} from "../../../utils";
import { CustomerContext } from "../../../providers/CustomerContext";

export const SelectDate = () => {
  const {
    dates,
    setDates,
    setOptions,
    orderInfo,
    setOrderInfo,
    setObjQtyTypeId,
    objQtyTypeId,
    setSoldOutId,
    setAvailableRooms,
  } = useContext(CustomerContext);

  const roomState = useSelector((state) => state.room.roomState);
  const bookingState = useSelector((state) => state.booking.bookingState);

  const loadingBooking = bookingState?.loading;
  const loadingRoom = roomState?.loading;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBookingAction());
  }, []);

  useEffect(() => {
    dispatch(fetchRoomAction());
    dispatch(fetchBookingAction());
  }, [dates]);

  const handleApply = (event, picker) => {
    setDates({
      startDay: timeStartDay(picker.startDate.valueOf()),
      endDay: timeEndDay(picker.endDate.valueOf()),
    });
    dispatch(fetchBookingAction());
  };

  useEffect(() => {
    const nights = Math.floor(
      (dates.endDay - dates.startDay) / (24 * 60 * 60 * 1000 - 1000) + 1
    );
    let newDate = {
      startDay: dates.startDay,
      endDay: dates.endDay,
    };
    let newOptions = [
      {
        id: v4(),
        adult: 2,
        children: 0,
        typeRoomId: 0,
        typeRoom: "",
        roomPrice: 0,
        roomName: "",
        maxPerson: 6,
        status: "Booked",
      },
    ];
    setOptions(newOptions);
    setOrderInfo({
      ...orderInfo,
      date: newDate,
      nights: nights,
      options: newOptions,
    });
    localStorage.setItem(
      "ORDER_INFO",
      JSON.stringify({
        ...orderInfo,
        date: newDate,
        nights: nights,
        options: newOptions,
      })
    );
  }, [dates]);

  useEffect(() => {
    let newQtyTypeIdBooked = qtyTypeIdBookedFunction(bookingState?.data, dates);
    let newObjQtyTypeId = filterObjQtyTypeRoomId(
      newQtyTypeIdBooked,
      roomState?.data,
      orderInfo.options
    );
    console.log("objQtyTypeId >>>>>", newObjQtyTypeId);
    setObjQtyTypeId(newObjQtyTypeId);
  }, [
    bookingState?.data,
    roomState?.data,
    dates,
    loadingBooking,
    loadingRoom,
    orderInfo.options,
  ]);

  useEffect(() => {
    const typeId = soldOutIdFilterValue0(objQtyTypeId);
    setSoldOutId(typeId);
    const newAvailableRooms = availableRoomsFunction(
      objQtyTypeId,
      roomState?.data
    );
    setAvailableRooms(newAvailableRooms);
  }, [objQtyTypeId]);

  return (
    <div className="flex">
      <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
      <div className="search-select">
        <label className="search-label">Select dates</label>
        <DateRangePicker
          onApply={handleApply}
          initialSettings={{
            startDate: moment(dates.startDay).toDate(),
            endDate: moment(dates.endDay).toDate(),
            locale: {
              format: "ddd, DD MMM",
            },
            minDate: new Date(),
          }}
        >
          <input type="text" className="form-control search-input" />
        </DateRangePicker>
      </div>
    </div>
  );
};
