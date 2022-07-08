import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

function ImageCarousel({ room }) {
  return (
    <div className="room-img-carousel">
      <Carousel
        dots={false}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {room.imageUrl.map((link, index) => (
          <div className="image" key={index}>
            <img style={{ width: "300px" }} src={link} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
