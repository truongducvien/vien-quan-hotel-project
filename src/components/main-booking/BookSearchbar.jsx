import { faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import "./style/book-header.scss";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { useCustomerState } from "../../hooks/useCustomerState.js";

function BookSearchbar() {
  const [state, dispatch] = useCustomerState();

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleApply = (event, picker) => {
    setDates({
      startDate: picker.startDate,
      endDate: picker.endDate,
    });
  };
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  //   useEffect(() => {
  //     console.log(options);
  //   }, [options]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleBookNowButton = () => {
    dispatch({
      type: "set_book_now_info",
      payload: {
        startDay: dates.startDate.format("ddd, DD MMM YY"),
        endDay: dates.endDate.format("ddd, DD MMM YY"),
        adult: options.adult,
        children: options.children,
      },
    });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    const nights = Math.floor(
      (dates.endDate - dates.startDate) / (24 * 60 * 60 * 1000)
    );
    console.log("nights:", nights);
  }, [dates]);

  return (
    <div className="book-searchbar">
      <div className="book-search">
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <DateRangePicker onApply={handleApply}>
              <input type="text" className="form-control" />
            </DateRangePicker>
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

            <div className="options">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button
                    disabled={options.adult <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button
                    disabled={options.children <= 0}
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    className="optionCounterButton"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* )} */}
          </div>
          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleBookNowButton}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSearchbar;
