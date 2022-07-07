import React from "react";
import "../style/room-list.css";

import "antd/dist/antd.css";
import RoomType from "./RoomType";
import RoomItem from "./RoomItem";
import { DataRoomsDemo } from "../../../stores/data-demo";

function RoomList() {
  return (
    <div className="rooms">
      {DataRoomsDemo.map((room) => (
        <div key={room.id} className="room">
          <RoomType room={room} />
          <RoomItem room={room} />
        </div>
      ))}
    </div>
  );
}

export default RoomList;
