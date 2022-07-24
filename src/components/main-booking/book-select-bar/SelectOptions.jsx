import React, { useContext, useEffect, useState } from "react";
import { useComponentVisible } from "./useComponentVisible";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomerContext } from "../../../providers/CustomerContext";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row } from "antd";
import { DeleteFilled, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { v4 } from "uuid";

export default function SelectOptions() {
  const { orderInfo, setOrderInfo, options, setOptions } =
    useContext(CustomerContext);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const [sumOptions, setSumOptions] = useState({
    sumRoom: 1,
    sumAdult: 2,
    sumChildren: 0,
  });

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
    setOrderInfo(orderInfo);
    localStorage.setItem("ORDER_INFO", JSON.stringify(orderInfo));

    setOptions(options);
  }, [orderInfo]);

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
        return {
          ...op,
          adult: op.adult,
        };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handlePlusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) + 1;
        return {
          ...op,
          children: op.children,
        };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleMinusAdult = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.adult = parseFloat(op.adult) - 1;
        return {
          ...op,
          adult: op.adult,
        };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleMinusChildren = (id) => {
    const newOptions = options.map((op) => {
      if (id === op.id) {
        op.children = parseFloat(op.children) - 1;
        return {
          ...op,
          children: op.children,
        };
      }
      return op;
    });
    setOptions(newOptions);
  };

  const handleAddFields = () => {
    setOptions([
      ...options,
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
    ]);
  };

  const handleSubmitOptions = (e) => {
    e.preventDefault();
    setIsComponentVisible(!isComponentVisible);
  };

  const handleRemoveFields = (id) => {
    let removeOption = options.filter((op) => op.id !== id);
    setOptions(removeOption);
  };
  return (
    <div ref={ref}>
      <div
        className="select-rooms"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
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

      {isComponentVisible && (
        <div>
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
            <form>
              {options.map((option, index) => (
                <Row key={option.id} className="select-option-row">
                  <Col md={5} lg={5}>
                    <span className="option-room-title">Room {index + 1}</span>
                  </Col>
                  <Col md={9} lg={9}>
                    <Button
                      disabled={option.adult <= 1}
                      type="primary"
                      ghost
                      shape="circle"
                      onClick={() => handleMinusAdult(option.id)}
                      icon={<MinusOutlined />}
                    />
                    <input
                      disabled
                      name="adult"
                      value={option.adult}
                      onChange={(event) => handleChangeInput(option.id, event)}
                    />
                    <Button
                      disabled={option.adult >= option.maxPerson}
                      type="primary"
                      ghost
                      shape="circle"
                      onClick={() => handlePlusAdult(option.id)}
                      icon={<PlusOutlined />}
                    />
                  </Col>
                  <Col md={9} lg={9}>
                    <Button
                      disabled={option.children <= 0}
                      type="primary"
                      ghost
                      shape="circle"
                      onClick={() => handleMinusChildren(option.id)}
                      icon={<MinusOutlined />}
                    />
                    <input
                      disabled
                      name="children"
                      value={option.children}
                      onChange={(event) => handleChangeInput(option.id, event)}
                    />
                    <Button
                      disabled={option.children >= option.adult / 2}
                      type="primary"
                      ghost
                      shape="circle"
                      onClick={() => handlePlusChildren(option.id)}
                      icon={<PlusOutlined />}
                    />
                  </Col>
                  <Col md={1} lg={1}>
                    {options.length > 1 && (
                      <DeleteFilled
                        onClick={() => handleRemoveFields(option.id)}
                      />
                    )}
                  </Col>
                </Row>
              ))}
              <div className="option-style-btns">
                <Button
                  disabled={options.length >= 7}
                  type="primary"
                  ghost
                  className={`option-add-room-btn ${
                    options.length >= 7 ? "disable" : ""
                  }`}
                  onClick={handleAddFields}
                >
                  Add additional room
                </Button>
                <button
                  className="option-done-rom-btn"
                  type="button"
                  onClick={handleSubmitOptions}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
