import { Col, Row } from "antd";
import React from "react";

export const PageFooter = () => {
  return (
    <div>
      <Row
        justify="space-around"
        style={{
          backgroundColor: "#fff",
          color: "#000",
          padding: "10px",
        }}
      >
        <Col> &copy; Copyright 2022</Col>
        <Col>
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </Col>
      </Row>
    </div>
  );
};
