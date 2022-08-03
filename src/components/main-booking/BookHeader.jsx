import React from "react";
import { Button, Dropdown, Menu, Row, Col } from "antd";
import "antd/dist/antd.css";
import "../payment-page/style/payment-page.scss";
import "./style/book-header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../stores/slices/user.slice";
import "../main-booking/style/book-header.scss";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const BookHeader = () => {
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
        break;
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (
            <NavLink to="/bookinghistory">
              <button className="pay-btn-logout">Booking History</button>
            </NavLink>
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
  const menuLogin = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: (
            <NavLink to="/login">
              <button className="pay-btn-logout">Sign in</button>
            </NavLink>
          ),
          key: "1",
        },
        {
          label: (
            <NavLink to="/register">
              <button className="pay-btn-logout">Sign up</button>
            </NavLink>
          ),
          key: "2",
        },
      ]}
    />
  );

  return (
    <div className="book-header">
      <div className="book-nav">
        <Row justify="center">
          <Col xs={2} sm={2} md={1} lg={1}></Col>
          <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
            <Link to="/">
              <p style={{ paddingBottom: "2px" }}>Ocean Villa </p>
            </Link>
          </Col>

          <Col xs={0} sm={3} md={8} lg={11}></Col>
          <Col xs={4} sm={5} md={3} lg={2}>
            <div style={{ margin: "6px" }}>
              {userInfo.data !== null ? (
                <Dropdown overlay={menu}>
                  <Button className="pay-btn-logout">
                    <FontAwesomeIcon icon={faUser} /> &nbsp;
                    {userInfo.data.email}
                  </Button>
                </Dropdown>
              ) : (
                <Dropdown overlay={menuLogin}>
                  <Button className="pay-btn-logout">
                    <FontAwesomeIcon icon={faUser} /> &nbsp; Account
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

// function BookHeader() {
//   return (
//     <div className="book-header">
//       <div className="book-nav">
//         <Row justify="center">
//           <Col xs={0} sm={0} md={1} lg={1}></Col>
//           <Col xs={24} sm={24} md={24} lg={7}>
//             <Row justify="center" className="text-logo">
//               <Col xs={12} sm={12} md={12} lg={17}>
//                 <Link to="/">
//                   <p>Ocean Villa</p>
//                 </Link>
//               </Col>
//               <Col xs={12} sm={12} md={12} lg={7}>
//                 <span>★ ★ ★ ★ ★</span>
//               </Col>
//             </Row>
//           </Col>
//           <Col xs={0} sm={0} md={0} lg={7}>
//             <ul className="sub-nav">
//               <li className="active">Availability</li>
//               <li>About</li>
//               <li>Contact</li>
//               <li>Policies</li>
//             </ul>
//           </Col>
//           <Col xs={0} sm={1} md={3} lg={5}></Col>
//           <Col xs={0} sm={0} md={0} lg={3}>
//             <ul className="right-nav">
//               <li className="first">VND</li>
//               <li>English</li>
//             </ul>
//           </Col>
//           <Col xs={0} sm={0} md={2} lg={1}></Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default BookHeader;
