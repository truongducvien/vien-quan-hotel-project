import React from "react";
import { Carousel, Col, Row } from "antd";

import header1 from "../../assets/images/header-image-1.jpg";
import header2 from "../../assets/images/header-image-2.jpg";
import header3 from "../../assets/images/header-image-3.jpg";
import header4 from "../../assets/images/header-image-4.jpg";

export const SectionCol = () => {
  return (
    <div className="section-col">
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="section-col content">
            <h2>The Ocean Villa</h2>
            <p>
              One of the largest integrated resort developments on Vietnam’s
              Central Coast and VinaCapital’s award-winning flagship resort, The
              Ocean Villas features 114 luxuriously appointed villas and 116
              suites, a world class golf course and many other amenities,
              offering guests a sanctuary of refined comfort overlooking
              Vietnam’s spectacular East Sea. Awarded 5 stars by the Vietnam
              National Administration of Tourism (VNAT), all villas and suites
              are elegantly furnished and provide 24/7 international standard
              service that is both attentive and discreet.
            </p>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="section-col carousel">
            <Carousel
              autoplay
              autoplaySpeed={3500}
              speed={2000}
              // effect="fade"
              arrows
              pauseOnHover={false}
            >
              <div>
                <img src={header2} alt="" />
              </div>
              <div>
                <img src={header3} alt="" />
              </div>
              <div>
                <img src={header1} alt="" />
              </div>
              <div>
                <img src={header4} alt="" />
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
};
