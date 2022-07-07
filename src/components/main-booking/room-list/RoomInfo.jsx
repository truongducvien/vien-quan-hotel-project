//room-type: room-type-carousel, room-type-intro
import React, { useState } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";

function RoomInfo({ room }) {
  const [ellipsisConvenient, setEllipsisConvenient] = useState(false);
  const [ellipsisIntroduction, setEllipsisIntroduction] = useState(false);
  return (
    <div>
      <div className="room-type-heading">{room.nameRoom}</div>
      <div className="room-type-content">
        <ul className="room-type-list">
          <li>
            <MdIcons.MdPerson />
            &nbsp;
            {room.maxPerson} sleep
          </li>
          <li>
            <MdIcons.MdKingBed />
            &nbsp;
            {room.bed}
          </li>
          <li>
            <FaIcons.FaBath />
            &nbsp;
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
  );
}

export default RoomInfo;
