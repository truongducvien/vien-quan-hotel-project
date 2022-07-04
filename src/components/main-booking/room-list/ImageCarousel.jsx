import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function ImageCarousel({ room }) {
  return (
    <div>
      <Swiper
        modules={[Navigation, A11y]}
        //   spaceBetween={50}
        slidesPerView={1}
        navigation
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[0]} alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[1]} alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[2]} alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[3]} alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[4]} alt="" />
        </SwiperSlide>
        <SwiperSlide style={{ flexShrink: 1 }}>
          <img src={room.imageUrl[5]} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageCarousel;
