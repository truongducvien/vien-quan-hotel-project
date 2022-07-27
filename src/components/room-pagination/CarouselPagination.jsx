import { Carousel } from "antd";
import React, { useRef } from "react";

export const CarouselPagination = () => {
  const carouselRef = useRef(null);

  return (
    <div className="carousel-container">
      <div
        onClick={() => {
          carouselRef.current.prev();
        }}
      >
        Previous
      </div>
      <Carousel ref={carouselRef}>
        <div className="carousel-item">
          <h3>1</h3>
        </div>
        <div className="carousel-item">
          <h3>2</h3>
        </div>
        <div className="carousel-item">
          <h3>3</h3>
        </div>
        <div className="carousel-item">
          <h3>4</h3>
        </div>
      </Carousel>
      <div
        onClick={() => {
          carouselRef.current.next();
        }}
      >
        Next
      </div>
    </div>
  );
};
