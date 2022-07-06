import { faCalendarDays, faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import bookHeader from "../../assets/images/book-header.avif";
import { Col, Row } from "antd";
import { v4 } from "uuid";
import { DeleteFilled } from "@ant-design/icons";
import "./style/book-searchbar.scss";
import { useCustomerTesting } from "../../hooks/useCustomerTesting";

function BookSearchTesting() {
  const [state, dispatch] = useCustomerTesting();
  // console.log(
  //   "🚀 ~ file: BookSearchTesting.jsx ~ line 17 ~ BookSearchTesting ~ state",
  //   state
  // );

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

  const [options, setOptions] = useState([{ id: v4(), adult: 1, children: 0 }]);

  const [sumOptions, setSumOptions] = useState({
    sumRoom: 1,
    sumAdult: 1,
    sumChildren: 0,
  });

  const handleBookNowButton = () => {
    dispatch({
      type: "set_book_now_info",
      payload: {
        startDay: dates.startDate,
        endDay: dates.endDate,
        roomNum: options.length,
        options: options,
      },
    });
  };
  // format("ddd, DD MMM YY")

  useEffect(() => {
    let guests = 0;
    options.forEach((option) => {
      guests += parseFloat(option.adult) + parseFloat(option.children);
    });
    let sumAdult = 0;
    options.forEach((option) => {
      sumAdult += parseFloat(option.adult);
    });
    let sumChildren = 0;
    options.forEach((option) => {
      sumChildren += parseFloat(option.children);
    });

    setSumOptions({
      ...sumOptions,
      sumRoom: options.length,
      sumAdult: sumAdult,
      sumChildren: sumChildren,
    });
  }, [options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit Options", options);
    console.log("submit SumOptions", sumOptions);
  };

  const handleChangeInput = (id, event) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op[event.target.name] = event.target.value;
      }
      return op;
    });

    setOptions(newOptions);
  };

  const handlePlusAdult = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.adult = parseFloat(op.adult) + 1;
      }
      return op;
    });

    setOptions(newOptions);
  };
  const handlePlusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) + 1;
      }
      return op;
    });

    setOptions(newOptions);
  };
  const handleMinusAdult = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.adult = parseFloat(op.adult) - 1;
      }
      return op;
    });

    setOptions(newOptions);
  };
  const handleMinusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) - 1;
      }
      return op;
    });

    setOptions(newOptions);
  };

  const handleAddFields = () => {
    setOptions([...options, { id: v4(), adult: 1, children: 0 }]);
  };

  const handleRemoveFields = (id) => {
    let removeOption = options.filter((op) => op.id !== id);
    setOptions(removeOption);
    console.log("remove Option", options);
    console.log("remove sumOption", sumOptions);
  };

  useEffect(() => {
    console.log(options);
  }, [options]);
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

            <Col xs={24} sm={24} md={6} lg={7}>
              <div className=" select-rooms">
                <div className="search-select">
                  <label className="search-label" htmlFor="">
                    Select rooms and guests
                  </label>
                  <div className="search-input">
                    <FontAwesomeIcon
                      icon={faUserLarge}
                      className="headerIcon"
                    />{" "}
                    &nbsp;
                    <span className="headerSearchText">
                      {` ${sumOptions.sumRoom} Room • ${sumOptions.sumAdult} Adult • ${sumOptions.sumChildren} Children`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="select-dropdown-body">
                <Row className="select-options-head">
                  <Col md={5} lg={5}></Col>
                  <Col md={9} lg={9}>
                    <h5>Adult</h5>
                    <p>Ages 12 or more</p>
                  </Col>
                  <Col md={9} lg={9}>
                    <h5>Children</h5>
                    <p>Ages 1 - 11</p>
                  </Col>
                  <Col md={1} lg={1}></Col>
                </Row>
                <form onSubmit={handleSubmit}>
                  {options.map((option, index) => (
                    <Row key={option.id} className="select-option-row">
                      <Col md={5} lg={5}>
                        <span className="option-room-title">
                          Room {index + 1}
                        </span>
                      </Col>
                      <Col md={9} lg={9}>
                        <button onClick={() => handleMinusAdult(option.id)}>
                          -
                        </button>

                        <input
                          name="adult"
                          value={option.adult}
                          onChange={(event) =>
                            handleChangeInput(option.id, event)
                          }
                        />
                        <button onClick={() => handlePlusAdult(option.id)}>
                          +
                        </button>
                      </Col>
                      <Col md={9} lg={9}>
                        <button onClick={() => handleMinusChildren(option.id)}>
                          -
                        </button>

                        <input
                          name="children"
                          value={option.children}
                          onChange={(event) =>
                            handleChangeInput(option.id, event)
                          }
                        />
                        <button onClick={() => handlePlusChildren(option.id)}>
                          +
                        </button>
                      </Col>
                      <Col md={1} lg={1}>
                        {options.length > 1 ? (
                          <DeleteFilled
                            onClick={() => handleRemoveFields(option.id)}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  ))}
                  <div className="option-style-btns">
                    <button
                      className="option-add-room-btn"
                      onClick={handleAddFields}
                    >
                      Add additional room
                    </button>
                    <button className="option-done-rom-btn" type="submit">
                      Done
                    </button>
                  </div>
                </form>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6}>
              <span>Have a promo code?</span>
            </Col>
            <Col xs={24} sm={24} md={6} lg={4}>
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

export default BookSearchTesting;
