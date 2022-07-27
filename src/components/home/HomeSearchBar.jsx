import React from "react";
import { Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "../main-booking/style/book-searchbar.scss";
import SelectOptions from "../main-booking/book-select-bar/SelectOptions";
import { SelectDate } from "../main-booking/book-select-bar/SelectDate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingAction } from "../../stores/slices/booking.slice";

function BookSearchBar() {
  const bookingState = useSelector((state) => state.booking.bookingState);
  const dispatch = useDispatch();

  const handleFetchBookingData = () => {
    dispatch(fetchBookingAction());
  };

  return (
    <div className="book-search">
      <div
        className="headerSearch"
        style={{ border: "none", background: "#fff" }}
      >
        <Row align="middle">
          <Col xs={24} sm={24} md={8} lg={8}>
            <SelectDate />
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <SelectOptions />
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <span>Have a promo code?</span>
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <Link to="/booking">
              <button
                onClick={handleFetchBookingData}
                className="bookNowButton"
              >
                Book now
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookSearchBar;
