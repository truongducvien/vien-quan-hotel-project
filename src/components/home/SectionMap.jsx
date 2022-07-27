import React from "react";
import { Col, Input, Row } from "antd";
// import MyMapGoogle from "./map/MyMapGoogle";
import TextArea from "antd/lib/input/TextArea";
import mapImg from "../../assets/images/map.png";

export const SectionMap = () => {
  return (
    <div className="section-map">
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          {/* <MyMapGoogle /> */}
          <img src={mapImg} alt="" />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="section-map contact">
            <h2>Visit Us</h2>
            <h4>The Ocean Villas</h4>
            <p>
              Address:{" "}
              <b>
                Address: Truong Sa street, Group 74, Hoa Hai ward, Ngu Hanh Son
                district, Da Nang city, Viet Nam Address:{" "}
              </b>
            </p>
            <p>
              Tel: <b>+84 236 3967 094</b>
            </p>
            <p>
              Fax: <b>+84 236 3967 095</b>
            </p>
            <p>
              Email:{" "}
              <b>
                reservations<i>@</i>theoceanvillas.com.vn
              </b>
            </p>
            <p style={{ marginTop: "40px" }}>
              Require further information? Send us a message and we will attend
              to you as soon as possible.
            </p>
            <form>
              <Row>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Input placeholder="Your Name" type="text" />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Input type="text" placeholder="Your Email" />
                </Col>
              </Row>
              <TextArea
                placeholder="Your Message"
                cols="90"
                rows="10"
                style={{ margin: " 20px 0" }}
              />
              <p>
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
              <p style={{ textAlign: "right" }}>
                <button type="button" className="send-btn">
                  SEND
                </button>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
