import React, { useState } from "react";
import { Col, Row } from "antd";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const FormCreditCard = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [month, SetMonth] = useState("");
  let [expiry, SetExpiry] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");

  const handleDate = (e) => {
    SetMonth(e.target.value);
    SetExpiry(e.target.value);
  };
  const handleExpiry = (e) => {
    SetExpiry(month.concat(e.target.value));
  };

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus}
        />
      </div>

      <br />
      <form>
        <Row justify="center">
          <Col xs={24} sm={24} md={12} xl={12}>
            <label>Card Number</label>
            <input
              type="tel"
              className="form-control"
              value={number}
              name="number"
              maxLength={16}
              pattern="[0-9]+"
              onChange={(e) => {
                SetNumber(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </Col>

          <Col xs={24} sm={24} md={12} xl={12}>
            <label>Name on card</label>
            <input
              type="text"
              className="form-control"
              value={name}
              name="name"
              onChange={(e) => {
                SetName(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </Col>
        </Row>
        <br />

        <Row justify="space-between">
          <Col>
            <label>Month</label>
            <select
              className="form-control card-date-select"
              name="expiry"
              onChange={handleDate}
            >
              <option value=" ">Month</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </Col>
          &nbsp;
          <Col>
            <label>Year</label>

            <select
              className="form-control card-date-select"
              name="expiry"
              onChange={handleExpiry}
            >
              <option value=" ">Year</option>
              <option value="22">2022</option>
              <option value="23">2023</option>
              <option value="24">2024</option>
              <option value="25">2025</option>
              <option value="26">2026</option>
              <option value="27">2027</option>
              <option value="28">2028</option>
              <option value="29">2029</option>
              <option value="30">2030</option>
              <option value="31">2031</option>
              <option value="32">2032</option>
            </select>
          </Col>
          &nbsp;
          <Col>
            <label>CVV</label>
            <input
              type="tel"
              placeholder="CVV"
              name="cvc"
              maxLength={3}
              className=" form-control"
              value={cvc}
              pattern="\d*"
              onChange={(e) => {
                SetCvc(e.target.value);
              }}
              onFocus={(e) => SetFocus(e.target.name)}
            ></input>
          </Col>
        </Row>
        <br />
      </form>
    </>
  );
};
export default FormCreditCard;
