import React from "react";
import "../style/room-list.scss";
import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";

function RoomList() {
  const roomState = useSelector((state) => state.room.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);

  const roomList = roomState?.data;

  return (
    <div className="rooms">
      {roomList.map((room) => (
        <div key={room.id} className="room">
          <RoomItem room={room} />
        </div>
      ))}
    </div>
  );
}

export default RoomList;
