import { Button, Dropdown, Menu, Row, Col } from "antd";
import "antd/dist/antd.css";
import "./style/payment-page.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../main-booking/style/book-header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logoutAction } from "../../stores/slices/user.slice";

export const PayHeader = () => {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        break;
      case "2":
        dispatch(logoutAction());
        break;

      default:
        dispatch(logoutAction());
        break;
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (
            <Link to="/bookinghistory">
              <button className="pay-btn-logout">Booking History</button>
            </Link>
          ),
          key: "1",
        },
        {
          label: <button className="pay-btn-logout">Logout</button>,
          key: "2",
        },
      ]}
    />
  );

  return (
    <div>
      <div className="pay-header">
        <Row justify="center">
          <Col xs={2} sm={2} md={1} lg={1}></Col>
          <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
            <Link to="/">
              <p>Ocean Villa </p>
            </Link>
          </Col>

          <Col xs={0} sm={3} md={8} lg={11}></Col>
          <Col xs={4} sm={5} md={3} lg={2}>
            <div>
              {userInfo.data !== {} && (
                <Dropdown overlay={menu}>
                  <Button className="pay-btn-logout">
                    <FontAwesomeIcon icon={faUser} /> &nbsp;
                    {userInfo.data.email}
                  </Button>
                </Dropdown>
              )}
            </div>
          </Col>

          <Col xs={1} sm={1} md={1} lg={1}></Col>
        </Row>
      </div>
    </div>
  );
};
