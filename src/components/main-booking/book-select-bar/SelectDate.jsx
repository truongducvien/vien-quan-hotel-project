import React, { useContext, useEffect, useState } from "react";
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
import { fetchBookingAction } from "../../../stores/slices/booking.slice";
import { timeEndDay, timeStartDay } from "../../../utils";
import { CustomerContext } from "../../../providers/CustomerContext";

export const SelectDate = () => {
  const {
    setOptions,
    orderInfo,
    setOrderInfo,
    setObjQtyTypeId,
    objQtyTypeId,
    setAvailableRooms,
  } = useContext(CustomerContext);

  const roomState = useSelector((state) => state.room.roomState);
  const bookingState = useSelector((state) => state.booking.bookingState);
  const bookingInfoState = useSelector(
    (state) => state.bookingInfo.bookingInfoState
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoomAction());
    dispatch(fetchBookingAction());
  }, [dispatch, bookingInfoState]);

  const [dates, setDates] = useState({
    startDay: orderInfo.date.startDay,
    endDay: orderInfo.date.endDay,
  });

  const handleApply = (event, picker) => {
    setDates({
      startDay: timeStartDay(picker.startDate.valueOf()),
      endDay: timeEndDay(picker.endDate.valueOf()),
    });
  };

  useEffect(() => {
    const nights = Math.floor(
      (dates.endDay - dates.startDay) / (24 * 60 * 60 * 1000 - 1000)
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
      JSON.stringify({ ...orderInfo, date: newDate, nights: nights })
    );
  }, [dates]);

  useEffect(() => {
    let futureDateOrdered = bookingState?.data.filter(
      (order) => order?.date.startDay >= timeStartDay(Date.now())
    );

    let canOrderDate = futureDateOrdered.filter(
      (order) =>
        dates.endDay < order?.date.startDay ||
        order?.date.endDay < dates.startDay
    );

    let cannotOrderDate = futureDateOrdered.filter(
      (order) => !canOrderDate.includes(order)
    );

    let orderedOptions = cannotOrderDate.map((order) => order.options);

    let OrderedTypeRoomId = orderedOptions.map((options) =>
      options.map((option) => option.typeRoomId)
    );

    let mergeOrderedTypeRoomId = Array.from([].concat(...OrderedTypeRoomId));

    const qtyTypeRoomIdOrdered = mergeOrderedTypeRoomId.reduce(
      (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
      {}
    );

    let arrQtyRoomsOfTypeRoom = roomState?.data.map((typeRoom) => [
      `${typeRoom.id}`,
      Number(`${typeRoom.roomList.length}`),
    ]);

    let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

    let diffMinus = Object.keys(objQtyRoomsOfTypeRoom).reduce((diff, key) => {
      if (qtyTypeRoomIdOrdered[key] >= objQtyRoomsOfTypeRoom[key]) {
        return diff;
      } else if (qtyTypeRoomIdOrdered[key] < objQtyRoomsOfTypeRoom[key]) {
        return {
          ...diff,
          [key]: objQtyRoomsOfTypeRoom[key] - qtyTypeRoomIdOrdered[key],
        };
      } else
        return {
          ...diff,
          [key]: objQtyRoomsOfTypeRoom[key],
        };
    }, {});
    console.log("objQtyTypeId >>>>>", diffMinus);
    setObjQtyTypeId(diffMinus);
  }, [bookingState?.data, roomState?.data, dates]);

  useEffect(() => {
    let arrayDiff = Object.keys(objQtyTypeId);

    const arrayDiffNum = arrayDiff.map((str) => {
      return Number(str);
    });

    let newAvailableRooms = roomState?.data.filter((typeRoom) =>
      arrayDiffNum.includes(typeRoom.id)
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
            startDate: moment(orderInfo.date.startDay).toDate(),
            endDate: moment(orderInfo.date.endDay).toDate(),
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
