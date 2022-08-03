import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import { Table } from "antd";

import { Loading } from "../../shared-components/Loading";
import { useSelector, useDispatch } from "react-redux";

import "../../../style/RoomManagement.scss";
import { roomsColumnTable } from "../../shared-components/tableData";
import { fetchRoomDataAction } from "../../../store/slices/roomSlice";
import { HeaderShare } from "../../shared-components/HeaderShare";

export default function RoomManagement() {
  const roomDispatch = useDispatch();
  const isLoading = useSelector((state) => state.roomReducer.isLoading);
  const rooms = useSelector((state) => state.roomReducer.rooms);

  useEffect(() => {
    roomDispatch(fetchRoomDataAction());
  }, []);

  return (
    <>
<<<<<<< HEAD
      <h3 className="roomsTitle">Rooms management</h3>

=======
      <HeaderShare />
>>>>>>> 53da8ceb35ed51f2ca52f7ed5caf561057e5969b
      <div className="backButton-container">
        <NavLink className="backButton" to="/admin">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
      </div>

      <div className="roomManagement">
        <NavLink className="addNewRoomButton" to="new">
          + Add new room type
        </NavLink>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Table columns={roomsColumnTable} dataSource={rooms} size='small'/>
          </>
        )}
      </div>
    </>
  );
}
