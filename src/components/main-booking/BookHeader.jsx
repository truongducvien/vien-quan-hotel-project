import React from "react";
import "./style/book-header.scss";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";

function BookHeader() {
  return (
    <div className="book-header">
      <div className="book-nav">
        <Row justify="center">
          <Col xs={0} sm={0} md={1} lg={1}></Col>
          <Col xs={24} sm={24} md={24} lg={7}>
            <Row justify="center" className="text-logo">
              <Col xs={12} sm={12} md={12} lg={17}>
                <Link to="/">
                  <p>Ocean Villa</p>
                </Link>
              </Col>
              <Col xs={12} sm={12} md={12} lg={7}>
                <span>★ ★ ★ ★ ★</span>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={0} lg={7}>
            <ul className="sub-nav">
              <li className="active">Availability</li>
              <li>About</li>
              <li>Contact</li>
              <li>Policies</li>
            </ul>
          </Col>
          <Col xs={0} sm={1} md={3} lg={5}></Col>
          <Col xs={0} sm={0} md={0} lg={3}>
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
