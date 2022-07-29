import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import "../../style/Header.scss";
import logo from "../../assets/images/ocean_villas_logo_6.png";
import header1 from "../../assets/images/header-image-1.jpg";
import header2 from "../../assets/images/header-image-2.jpg";
import header3 from "../../assets/images/header-image-3.jpg";
import header4 from "../../assets/images/header-image-4.jpg";
import { Button, Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import "../payment-page/style/payment-page.scss";
import "../main-booking/style/book-header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../stores/slices/user.slice";
import "../main-booking/style/book-header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
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
    <div className="header">
      <div className="images-slide">
        <Carousel
          autoplay
          autoplaySpeed={6000}
          speed={2000}
          effect="fade"
          arrows
          pauseOnHover={false}
        >
          <div className="header-image">
            <img src={header1} alt="" />
          </div>
          <div className="header-image">
            <img src={header2} alt="" />
          </div>
          <div className="header-image">
            <img src={header3} alt="" />
          </div>
          <div className="header-image">
            <img src={header4} alt="" />
          </div>
        </Carousel>
      </div>

      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <div style={{ margin: "6px" }} className="home-account">
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

      <NavLink to="/booking">
        <button className="bookNowButton">Book now</button>
      </NavLink>
    </div>
  );
}
