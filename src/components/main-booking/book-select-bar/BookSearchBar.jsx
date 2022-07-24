import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "../style/book-searchbar.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";
import { fetchBookingAction } from "../../../stores/slices/bookingsSlice";
import { timeEndDay, timeStartDay } from "../../../utils";
import { CustomerContext } from "../../../providers/CustomerContext";
import SelectOptions from "./SelectOptions";

function BookSearchBar() {
  const { orderInfo, setOrderInfo, setObjQtyTypeId } =
    useContext(CustomerContext);

  const roomState = useSelector((state) => state?.room?.roomState);
  const bookingState = useSelector((state) => state?.booking?.bookingState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
    dispatch(fetchBookingAction());
  }, []);

  const today = Date.now();

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
    setOrderInfo({ ...orderInfo, date: newDate, nights: nights });
    localStorage.setItem(
      "ORDER_INFO",
      JSON.stringify({ ...orderInfo, date: newDate, nights: nights })
    );
  }, [dates]);

  useEffect(() => {
    let futureDateOrdered = bookingState?.data.filter(
      (order) => order?.date.startDay >= timeStartDay(today)
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

    // get object quantity typeRoomId of array ordered =====>>>>>>>>
    const qtyTypeRoomIdOrdered = mergeOrderedTypeRoomId.reduce(
      (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
      {}
    );

    let arrQtyRoomsOfTypeRoom = roomState?.data.map((typeRoom) => [
      `${typeRoom.id}`,
      Number(`${typeRoom.roomList.length}`),
    ]);

    // get object quantity room of 1 typeRoom in rooms-server =====>>>>>>>>
    let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

    // filter object different (quantity typeRoomId of ordered) & (quantity room of 1 typeRoom in rooms-server )
    let diff = Object.keys(objQtyRoomsOfTypeRoom).reduce((diff, key) => {
      if (qtyTypeRoomIdOrdered[key] >= objQtyRoomsOfTypeRoom[key]) return diff;
      return {
        ...diff,
        [key]: objQtyRoomsOfTypeRoom[key],
      };
    }, {});
    console.log("🚀 ~ file: BookSearchBar.jsx ~ line 118 ~ diff ~ diff", diff);

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
    console.log(
      "🚀 ~ file: BookSearchBar.jsx ~ line 143 ~ diffMinus ~ diffMinus",
      diffMinus
    );
    setObjQtyTypeId(diffMinus);
  }, []);

  return (
    <div className="book-search">
      <div className="headerSearch">
        <Row align="middle">
          <Col xs={24} sm={24} md={6} lg={7}>
            <div className="flex">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <div className="search-select">
                <label className="search-label" htmlFor="">
                  Select dates
                </label>
                <DateRangePicker
                  onApply={handleApply}
                  initialSettings={{
                    timePicker: true,
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
          </Col>

          <Col xs={24} sm={24} md={8} lg={7}>
            <SelectOptions />
          </Col>
          <Col xs={24} sm={24} md={5} lg={6}>
            <span>Have a promo code?</span>
          </Col>
          <Col xs={24} sm={24} md={5} lg={4}></Col>
        </Row>
      </div>
    </div>
  );
}

export default BookSearchBar;
