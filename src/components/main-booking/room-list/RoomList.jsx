import React from "react";
import "./room-list.css";

import "antd/dist/antd.css";
import RoomType from "./RoomType";
import RoomRateList from "./RoomRateList";
import RoomSoldOut from "./RoomSoldOut";
import { DataRoomsDemo } from "../../../stores/data-demo";

function RoomList() {
  return (
    <div className="rooms">
      {DataRoomsDemo.map((room) => (
        <div key={room.id} className="room">
          <RoomType room={room} />
          <RoomRateList room={room} />
          <RoomRateList room={room} />
          <RoomSoldOut room={room} />
        </div>
      ))}
    </div>
  );
}

export default RoomList;
