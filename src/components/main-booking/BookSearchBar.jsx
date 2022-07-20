import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../../providers/CustomerContext";
import BookSearchInput from "./BookSearchInput";
import { Col, Row } from "antd";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import bookHeader from "../../assets/images/book-header.avif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import "./style/book-searchbar.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../stores/slices/roomsSlice";
import { fetchBookingAction } from "../../stores/slices/bookingsSlice";
import { timeEndDay, timeStartDay } from "../../utils";
import { fetchPromotionAction } from "../../stores/slices/promotionsSlice";

function BookSearchBar() {
  const { orderInfo, setOrderInfo, setAvailableRooms } =
    useContext(CustomerContext);

  const roomState = useSelector((state) => state.room.roomState);
  const bookingState = useSelector((state) => state.booking.bookingState);
  const promotionState = useSelector((state) => state.promotion.promotionState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
    dispatch(fetchBookingAction());
    dispatch(fetchPromotionAction());
  }, []);

  const rooms = roomState?.data;
  const bookingList = bookingState?.data;
  const promotionList = promotionState?.data;

  const today = Date.now();
  const tomorrow = today + 24 * 60 * 60 * 1000;

  const [dates, setDates] = useState({
    startDate: timeStartDay(today),
    endDate: timeEndDay(tomorrow),
  });

  const handleApply = (event, picker) => {
    setDates({
      startDate: timeStartDay(picker.startDate.valueOf()),
      endDate: timeEndDay(picker.endDate.valueOf()),
    });
  };

  const handleBookNowButton = () => {
    const nights = Math.floor(
      (dates.endDate - dates.startDate) / (24 * 60 * 60 * 1000 - 1000)
    );
    let newDate = {
      startDay: dates.startDate,
      endDay: dates.endDate,
    };
    setOrderInfo({ ...orderInfo, date: newDate, nights: nights });
    localStorage.setItem(
      "ORDER_INFO",
      JSON.stringify({ ...orderInfo, date: newDate, nights: nights })
    );

    // dates filter type room ======>>>>>
    let futureDateOrdered = bookingList.filter(
      (order) => order?.date.startDay >= timeStartDay(today)
    );

    let canOrderDate = futureDateOrdered.filter(
      (order) =>
        dates.endDate < order?.date.startDay ||
        order?.date.endDay < dates.startDate
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

    let arrQtyRoomsOfTypeRoom = rooms.map((typeRoom) => [
      `${typeRoom.id}`,
      Number(`${typeRoom.roomList.length}`),
    ]);

    // get object quantity room of 1 typeRoom in rooms-server =====>>>>>>>>
    let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

    // filter object different (quantity typeRoomId of ordered) & (quantity room of 1 typeRoom in rooms-server )
    let diff = Object.keys(objQtyRoomsOfTypeRoom).reduce((diff, key) => {
      if (qtyTypeRoomIdOrdered[key] === objQtyRoomsOfTypeRoom[key]) return diff;
      return {
        ...diff,
        [key]: objQtyRoomsOfTypeRoom[key],
      };
    }, {});

    // object different => array
    let arrayDiff = Object.keys(diff);

    const arrayDiffNum = arrayDiff.map((str) => {
      return Number(str);
    });

    let newAvailableRooms = rooms.filter((typeRoom) =>
      arrayDiffNum.includes(typeRoom.id)
    );

    setAvailableRooms(newAvailableRooms);
  };

  return (
    <div>
      <div className="book-header-img">
        <img src={bookHeader} alt="" />
      </div>
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
                      // startDate: timeStartDay(today),
                      // endDate: timeEndDay(tomorrow),
                      startDate: moment().startOf("hour").toDate().valueOf(),
                      endDate: moment()
                        .startOf("hour")
                        .add(24, "hour")
                        .toDate(),
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
              <BookSearchInput />
            </Col>
            <Col xs={24} sm={24} md={5} lg={6}>
              <span>Have a promo code?</span>
            </Col>
            <Col xs={24} sm={24} md={5} lg={4}>
              <button className="headerBtn" onClick={handleBookNowButton}>
                Search
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default BookSearchBar;
