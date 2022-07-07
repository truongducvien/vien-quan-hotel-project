import React, { useEffect, useState } from "react";
import "../style/room-list.scss";

import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { DataRoomsDemo } from "../../../stores/data-demo";

function RoomList() {
  return (
    <div className="rooms">
      {DataRoomsDemo.map((room) => (
        <div key={room.id} className="room">
          <RoomItem room={room} />
        </div>
      ))}
    </div>
  );
}

export default RoomList;
