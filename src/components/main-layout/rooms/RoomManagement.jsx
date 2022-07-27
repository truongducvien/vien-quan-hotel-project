import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Table, Space, Spin } from 'antd';

import { useSelector, useDispatch } from 'react-redux'

import '../../../style/RoomManagement.scss'
import { columns } from '../../shared-components/tableData';
import { fetchRoomDataAction } from '../../../store/slices/roomSlice'


export default function RoomManagement () {

   const roomDispatch = useDispatch()
   const isLoading = useSelector(state => state.roomReducer.isLoading)
   const rooms = useSelector(state => state.roomReducer.rooms)

   useEffect(()=> {
      roomDispatch(fetchRoomDataAction())
   }, [])

   return(
      <>
         <div className='backButton-container'>
            <NavLink className='backButton' to='/'>
               <i className="fa-solid fa-arrow-left"></i>
            </NavLink>
         </div>
      
         <div className='roomManagement'>
            <NavLink className='addNewRoomButton' to='new'>Add new room type</NavLink>
            
            {isLoading? (
               <>
                  <br /><br />
                  <Space>
                     <Spin size='large'/>
                  </Space>
               </>
            ):(
               <>
                  <Table columns={columns} dataSource={rooms} />
               </>
            )}
            
         </div>
      </>
   )
}