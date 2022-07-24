import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import { Carousel } from "antd";
import "../../style/Header.scss";
import logo from "../../assets/images/ocean_villas_logo_6.png";
import header1 from "../../assets/images/header-image-1.jpg";
import header2 from "../../assets/images/header-image-2.jpg";
import header3 from "../../assets/images/header-image-3.jpg";
import header4 from "../../assets/images/header-image-4.jpg";

export default function Header({ handleBookNow }) {
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

      <NavLink to="/booking">
        <button onClick={handleBookNow} className="bookNowButton">
          Book now
        </button>
      </NavLink>
    </div>
  );
}
