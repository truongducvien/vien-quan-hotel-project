import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";
import "../style/room-list.scss";
import "antd/dist/antd.css";
import RoomItem from "./RoomItem";

function RoomListOption({ maxPerson, idOption }) {
  const roomState = useSelector((state) => state.room.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);

  const roomList = roomState?.data;

  let filterRoom = roomList.filter((room) => room.maxPerson >= maxPerson);

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
