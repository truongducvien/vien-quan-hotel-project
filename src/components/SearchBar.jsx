import { useState, useEffect } from "react";

import { useCustomerState } from "../hooks/useCustomerState";

import "antd/dist/antd.css";
import { DatePicker, Space, Select } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const now = new Date();
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const { Option } = Select;
const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function SearchBar() {
  const [startDay, setStartDay] = useState(now.getTime());
  const [endDay, setEndDay] = useState(tomorrow.getTime());
  const [adultCount, setAdultCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const [state, dispatch] = useCustomerState();

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleChange = (e, inputType) => {
    switch (inputType) {
      case "start_day":
        setStartDay(e._d.getTime());
        break;
      case "end_day":
        setEndDay(e._d.getTime());
        break;
      case "adult":
        setAdultCount(e);
        break;
      case "children":
        setChildrenCount(e);
        break;
      default:
        throw new Error("Invalid inputType");
    }
  };

  const handleBookNowButton = () => {
    dispatch({
      type: "set_book_now_info",
      payload: {
        startDay: startDay,
        endDay: endDay,
        adult: adultCount,
        children: childrenCount,
      },
    });
  };

  return (
    <div className="searchBar">
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <p>Check-in</p>
          <Space direction="vertical" size={12}>
            <DatePicker
              onChange={(e) => handleChange(e, "start_day")}
              defaultValue={moment(now, dateFormatList[0])}
              format={dateFormatList}
            />
          </Space>
        </div>

        <div className="form-group">
          <p>Check-out</p>
          <Space direction="vertical" size={12}>
            <DatePicker
              onChange={(e) => handleChange(e, "end_day")}
              defaultValue={moment(tomorrow, dateFormatList[0])}
              format={dateFormatList}
            />
          </Space>
        </div>

        <div className="form-group">
          <p>Adult</p>
          <Select
            defaultValue="1"
            style={{
              width: 120,
            }}
            onChange={(e) => handleChange(e, "adult")}
          >
            {numberArray.map((item, index) => {
              return (
                item > 0 && (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                )
              );
            })}
          </Select>
        </div>

        <div className="form-group">
          <p>Children</p>
          <Select
            defaultValue="0"
            style={{
              width: 120,
            }}
            onChange={(e) => handleChange(e, "children")}
          >
            {numberArray.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>

        <Link to="/booking">
          <button onClick={handleBookNowButton} className="bookNowButton">
            Book now
          </button>
        </Link>
      </form>
    </div>
  );
}
