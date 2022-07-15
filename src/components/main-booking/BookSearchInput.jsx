import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerContext } from "../../providers/CustomerContext";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { v4 } from "uuid";

function BookSearchInput() {
  const { customerBook, setCustomerBook, options, setOptions } =
    useContext(CustomerContext);

  const [sumOptions, setSumOptions] = useState({
    sumRoom: 1,
    sumAdult: 2,
    sumChildren: 0,
  });

  const [showSelectOption, setShowSelectOption] = useState(false);

  useEffect(() => {
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
    setOptions(options);
  }, [options]);

  useEffect(() => {
    setCustomerBook(customerBook);
    localStorage.setItem("CUSTOMER-HOTEL", JSON.stringify(customerBook));

    setOptions(options);
  }, [customerBook]);

  const handleSubmitOptions = (e) => {
    e.preventDefault();
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
        return { ...op, adult: op.adult, roomName: "", roomPrice: 0 };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handlePlusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) + 1;
        return { ...op, children: op.children, roomName: "", roomPrice: 0 };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleMinusAdult = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.adult = parseFloat(op.adult) - 1;
        return { ...op, adult: op.adult, roomName: "", roomPrice: 0 };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleMinusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) - 1;
        return { ...op, children: op.children, roomName: "", roomPrice: 0 };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleAddFields = () => {
    setOptions([
      ...options,
      { id: v4(), adult: 2, children: 0, roomName: "", roomPrice: 0 },
    ]);
  };

  const handleRemoveFields = (id) => {
    let removeOption = options.filter((op) => op.id !== id);
    setOptions(removeOption);
  };

  return (
    <div>
      <div
        className="select-rooms"
        onClick={() => setShowSelectOption(!showSelectOption)}
      >
        <div className="search-select">
          <label className="search-label" htmlFor="">
            Select rooms and guests
          </label>
          <div className="search-input">
            <FontAwesomeIcon icon={faUserLarge} className="headerIcon" /> &nbsp;
            <span className="headerSearchText">
              {` ${sumOptions.sumRoom} Room • ${sumOptions.sumAdult} Adult • ${sumOptions.sumChildren} Children`}
            </span>
          </div>
        </div>
      </div>

      {showSelectOption && (
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
          <form onSubmit={handleSubmitOptions}>
            {options.map((option, index) => (
              <Row key={option.id} className="select-option-row">
                <Col md={5} lg={5}>
                  <span className="option-room-title">Room {index + 1}</span>
                </Col>
                <Col md={9} lg={9}>
                  <button onClick={() => handleMinusAdult(option.id)}>-</button>

                  <input
                    disabled
                    name="adult"
                    value={option.adult}
                    onChange={(event) => handleChangeInput(option.id, event)}
                  />
                  <button onClick={() => handlePlusAdult(option.id)}>+</button>
                </Col>
                <Col md={9} lg={9}>
                  <button onClick={() => handleMinusChildren(option.id)}>
                    -
                  </button>

                  <input
                    disabled
                    name="children"
                    value={option.children}
                    onChange={(event) => handleChangeInput(option.id, event)}
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
              <button className="option-add-room-btn" onClick={handleAddFields}>
                Add additional room
              </button>
              <button
                onClick={() => setShowSelectOption(!showSelectOption)}
                className="option-done-rom-btn"
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookSearchInput;
