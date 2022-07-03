//room-type: room-type-carousel, room-type-intro

import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import "./room-list.css";

function RoomType({ room }) {
  const [ellipsisConvenient, setEllipsisConvenient] = useState(false);
  const [ellipsisIntroduction, setEllipsisIntroduction] = useState(false);
  return (
    <div>
      <div className="room-type">
        <div className="room-type-carousel">
          <ImageCarousel room={room} />
        </div>
        <div className="room-type-intro">
          <div className="room-type-heading">{room.nameRoom}</div>
          <div className="room-type-content">
            <ul className="room-type-list">
              <li>
                {room.iconPerson}
                &nbsp;
                {room.maxPerson}
              </li>
              <li>
                {room.iconBed} &nbsp;
                {room.bed}
              </li>
              <li>
                {room.iconBath} &nbsp;
                {room.bathrooms}
              </li>
            </ul>
            <div
              className={ellipsisConvenient ? "" : "ellipsis-text"}
              onClick={() => {
                setEllipsisConvenient(!ellipsisConvenient);
              }}
            >
              {room.convenient}
            </div>
            <div
              style={{ marginTop: "16px" }}
              className={ellipsisIntroduction ? "" : "ellipsis-text"}
              onClick={() => {
                setEllipsisIntroduction(!ellipsisIntroduction);
              }}
            >
              {room.introduction}
            </div>
            <div
              style={{
                textDecoration: "underline",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setEllipsisIntroduction(!ellipsisIntroduction);
              }}
            >
              {ellipsisIntroduction ? "Less info" : "More info"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomType;
