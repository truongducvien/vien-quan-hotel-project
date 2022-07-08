import React from "react";

import "../style/room-list.scss";

import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { DataRoomsDemo } from "../../../stores/data-demo";

function RoomListOption({ maxPerson, idOption }) {
  let filterRoom = DataRoomsDemo.filter((room) => room.maxPerson >= maxPerson);

  return (
    <div className="rooms">
      {filterRoom.map((room) => (
        <div key={room.id} className="room">
          <RoomItem room={room} idOption={idOption} />
        </div>
      ))}
    </div>
  );
}

export default RoomListOption;
