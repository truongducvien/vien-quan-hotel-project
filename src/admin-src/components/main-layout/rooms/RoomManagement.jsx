import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import { Table } from "antd"; 

import { Loading } from "../../shared-components/Loading";
import { useSelector, useDispatch } from "react-redux";

import "../../../style/RoomManagement.scss";
import { roomsColumnTable } from "../../shared-components/tableData";
import { fetchRoomDataAction } from "../../../store/slices/roomSlice";
import RoomsFilter from "./RoomsFilter";


export default function RoomManagement() {
  const roomDispatch = useDispatch();
  const isLoading = useSelector((state) => state.roomReducer.isLoading);
  const rooms = useSelector((state) => state.roomReducer.rooms);

  const [tableData, setTableData] = useState([])
  const [tableDataToShow, setTableDataToShow] = useState([...rooms])

  useEffect(() => {
    roomDispatch(fetchRoomDataAction());
  }, []);

  useEffect(() => {
    setTableData([...rooms])
    setTableDataToShow([...rooms])
  }, [rooms])
  
  const handleFilter = (data) => {
    setTableDataToShow(data)
  }

  return (
    <>
      <div className="backButton-container">
        <NavLink className="backButton" to="/admin">
          <i className="fa-solid fa-arrow-left"></i>
        </NavLink>
      </div>

      <div className="roomManagement">
        <NavLink className="addNewRoomButton" to="new">
          + Add new
        </NavLink>

        {isLoading ? (
          <Loading />
        ) : (
          <div className='rooms-table'>
            <Table columns={roomsColumnTable} dataSource={tableDataToShow} size='small'/>
          </div>
        )}

        <RoomsFilter 
          tableData={tableData} 
          handleFilter={handleFilter}
        />
      </div>
    </>
  );
}
