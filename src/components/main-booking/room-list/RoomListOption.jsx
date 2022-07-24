import React, { useContext, useEffect } from "react";
import "../style/room-list.scss";
import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { CustomerContext } from "../../../providers/CustomerContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";

function RoomListOption({ option }) {
  const { availableRooms } = useContext(CustomerContext);
  const roomState = useSelector((state) => state?.room?.roomState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);
  // console.log("roomState?.data", roomState?.data);

  let filterRoom = roomState?.data.filter(
    (room) => room.maxPerson >= option.adult
  );
  let filterAvailableRooms = availableRooms.filter(
    (room) => room.maxPerson >= option.adult
  );

  return (
    <div className="rooms">
      {/* {availableRooms < 1
        ? filterRoom.map((room) => (
            <div key={room.id} className="room">
              <RoomItem option={option} room={room} />
            </div>
          ))
        : */}
      {filterAvailableRooms.map((room) => (
        <div key={room.id} className="room">
          <RoomItem option={option} room={room} />
        </div>
      ))}
      {/* } */}
    </div>
  );
}

export default RoomListOption;
