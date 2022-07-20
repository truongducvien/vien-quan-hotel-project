import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ImageCarouselSwiper({ room }) {
  SwiperCore.use([Autoplay]);
  return (
    <div className="room-img-carousel">
      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3500 }}
      >
        {room.imageUrl.map((link, index) => (
          <SwiperSlide className="image" key={index}>
            <img src={link} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageCarouselSwiper;
