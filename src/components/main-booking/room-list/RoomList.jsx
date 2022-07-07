import React, { useContext, useEffect, useState } from "react";

import "../style/room-list.scss";

import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { DataRoomsDemo } from "../../../stores/data-demo";
import { CustomerContext } from "../../../providers/CustomerContext";

function RoomList() {
  const { customer, setCustomer } = useContext(CustomerContext);
  // let filterRoom = customer.options.filter(
  //   (option) => option.adult + option.children <= maxPerson
  // );
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
