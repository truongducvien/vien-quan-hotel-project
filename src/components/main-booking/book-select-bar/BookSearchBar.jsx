import React from "react";
import { Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "../style/book-searchbar.scss";
import SelectOptions from "./SelectOptions";
import { PromoCodeSearch } from "./PromoCodeSearch";
import { SelectDate } from "./SelectDate";

function BookSearchBar() {
  return (
    <div className="book-search">
      <div className="headerSearch">
        <Row align="middle">
          <Col xs={24} sm={24} md={8} lg={8}>
            <SelectDate />
          </Col>

          <Col xs={24} sm={24} md={8} lg={8}>
            <SelectOptions />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <PromoCodeSearch />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookSearchBar;
