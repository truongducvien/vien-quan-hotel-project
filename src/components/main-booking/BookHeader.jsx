import React from "react";
import "./style/book-header.scss";
import { Row, Col } from "antd";

function BookHeader() {
  return (
    <div className="book-header">
      <div className="book-nav">
        <Row justify="center">
          <Col xs={24} sm={24} md={5} ml={5}>
            <div className="text-logo">
              <p>Ocean Villa</p>
              <span>★ ★ ★ ★ ★</span>
            </div>
          </Col>
          <Col xs={23} sm={14} md={8} ml={6}>
            <ul className="sub-nav">
              <li className="active">Availability</li>
              <li>About</li>
              <li>Contact</li>
              <li>Policies</li>
            </ul>
          </Col>
          <Col xs={0} sm={1} md={3} ml={2}></Col>
          <Col xs={0} sm={6} md={2} ml={2}>
            <ul className="right-nav">
              <li className="first">VND</li>
              <li>English</li>
            </ul>
          </Col>
          <Col xs={0} sm={0} md={2} ml={0}></Col>
        </Row>
      </div>
    </div>
  );
}

export default BookHeader;
