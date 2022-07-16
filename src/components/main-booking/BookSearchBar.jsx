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
import { fetchOrderAction } from "../../stores/slices/ordersSlice";

function BookSearchBar() {
  const { setOrderInfo, options, setAvailableRooms } =
    useContext(CustomerContext);

  const orderState = useSelector((state) => state.order.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderAction());
  }, []);

  const orderList = orderState?.data;

  const roomState = useSelector((state) => state.room.roomState);

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);

  const roomList = roomState?.data;

  const today = Date.now();
  const tomorrow = today + 24 * 60 * 60 * 1000;

  const [dates, setDates] = useState({
    startDate: today,
    endDate: tomorrow,
  });

  const handleApply = (event, picker) => {
    setDates({
      startDate: picker.startDate.valueOf(),
      endDate: picker.endDate.valueOf(),
    });
  };

  const handleBookNowButton = () => {
    const nights = Math.floor(
      (dates.endDate - dates.startDate) / (24 * 60 * 60 * 1000)
    );
    let newCustomer = {
      userInfo: {},
      date: {
        startDay: dates.startDate,
        endDay: dates.endDate,
      },
      nights: nights,
      options: options,
    };
    setOrderInfo(newCustomer);
    localStorage.setItem("ORDER_INFO", JSON.stringify(newCustomer));

    let canOrderDate = orderList.filter(
      (order) =>
        dates.endDate < order?.date.startDay ||
        order?.date.endDay < dates.startDate
    );
    let cannotOrderDate = orderList.filter(
      (order) => !canOrderDate.includes(order)
    );

    let cannotOptions = cannotOrderDate.map((order) => order.options);

    let cannotRoomId = cannotOptions.map((options) =>
      options.map((option) => option.roomId)
    );

    let mergeCannotRoomId = Array.from(new Set([].concat(...cannotRoomId)));

    let newAvailableRooms = roomList.filter(
      (room) => !mergeCannotRoomId.includes(room.id)
    );
    console.log(
      "🚀 ~ file: BookSearchBar.jsx ~ line 92 ~ handleBookNowButton ~ newAvailableRooms",
      newAvailableRooms
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
                      startDate: moment().startOf("hour").toDate(),
                      endDate: moment()
                        .startOf("hour")
                        .add(24, "hour")
                        .toDate(),
                      locale: {
                        format: "ddd, DD MMM",
                      },
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
