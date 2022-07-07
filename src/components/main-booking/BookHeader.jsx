import React from "react";
import "./style/book-header.scss";
import { Row, Col } from "antd";

function BookHeader() {
  return (
    <div className="book-header">
      <div className="book-nav">
        <Row justify="center">
          <Col xs={0} sm={0} md={1} lg={1}></Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <Row justify="center" className="text-logo">
              <Col xs={12} sm={12} md={16} lg={16}>
                <p>Ocean Villa</p>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <span>★ ★ ★ ★ ★</span>
              </Col>
            </Row>
          </Col>
          <Col xs={23} sm={14} md={8} lg={7}>
            <ul className="sub-nav">
              <li className="active">Availability</li>
              <li>About</li>
              <li>Contact</li>
              <li>Policies</li>
            </ul>
          </Col>
          <Col xs={0} sm={1} md={3} lg={6}></Col>
          <Col xs={0} sm={6} md={2} lg={3}>
            <ul className="right-nav">
              <li className="first">VND</li>
              <li>English</li>
            </ul>
          </Col>
          <Col xs={0} sm={0} md={2} lg={1}></Col>
        </Row>
      </div>
    </div>
  );
}

export default BookHeader;
