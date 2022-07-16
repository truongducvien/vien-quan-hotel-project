import React, { useContext, useEffect } from "react";
import "../style/room-list.scss";
import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { CustomerContext } from "../../../providers/CustomerContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";

function RoomListOption({ sumPerson, idOption }) {
  const { availableRooms } = useContext(CustomerContext);
  const roomState = useSelector((state) => state.room.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);

  const roomList = roomState?.data;

  let filterRoom = roomList.filter((room) => room.maxPerson >= sumPerson);
  let filterAvailableRooms = availableRooms.filter(
    (room) => room.maxPerson >= sumPerson
  );

  return (
    <div className="rooms">
      {availableRooms < 1
        ? filterRoom.map((room) => (
            <div key={room.id} className="room">
              <RoomItem room={room} idOption={idOption} />
            </div>
          ))
        : filterAvailableRooms.map((room) => (
            <div key={room.id} className="room">
              <RoomItem room={room} idOption={idOption} />
            </div>
          ))}
    </div>
  );
}

export default RoomListOption;
