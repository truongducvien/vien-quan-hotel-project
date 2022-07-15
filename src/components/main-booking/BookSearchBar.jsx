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

function BookSearchBar() {
  const { customerBook, setCustomerBook, options } =
    useContext(CustomerContext);

  const tomorrowDate = new Date().getTime() + 24 * 60 * 60 * 1000;

  const [dates, setDates] = useState([
    moment(new Date()),
    moment(tomorrowDate),
  ]);

  useEffect(() => {
    const nights = Math.floor(
      (dates[1].toDate().getTime() - dates[0].toDate().getTime()) /
        (24 * 60 * 60 * 1000)
    );
    setCustomerBook({ ...customerBook, nights: nights });
  }, [dates]);

  const handleApply = (event, picker) => {
    setDates([picker.startDate, picker.endDate]);
  };
  //.format("ddd, DD MMM YY")  //.toDate().getTime()
  const handleBookNowButton = () => {
    let newCustomer = {
      date: [dates[0], dates[1]],
      nights: Math.floor(
        (dates[1].toDate().getTime() - dates[0].toDate().getTime()) /
          (24 * 60 * 60 * 1000)
      ),
      roomNum: options.length,
      options: options,
    };

    setCustomerBook(newCustomer);

    localStorage.setItem("CUSTOMER-HOTEL", JSON.stringify(newCustomer));
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
