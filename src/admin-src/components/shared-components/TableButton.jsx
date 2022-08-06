import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import '../../style/TableButton.scss'

import { useDispatch, useSelector } from "react-redux/es/exports"
import { deleteRoomType } from '../../store/slices/roomSlice'
import { API, API_URL } from "../../api/constAPI"

export default function TableButton ({ record }){
   const dispatch = useDispatch()
   const rooms = useSelector( state => state.roomReducer.rooms)
   
   const handleDelete = (record) => {
      if(record.roomsList.some( room => room.roomStatus === 'active')){
         alert(`Can't delete ${record.typeRoom} because there is an active room now, check-out all and try again!`)
      } else {
         if(window.confirm(`Are you sure to delete "${record.typeRoom}"?`)){
            dispatch(deleteRoomType(record.id))
         }
      }
   }

   return (
      <div className="tableButton">
         <NavLink className='button' to='edit' state={record}>Edit</NavLink>
         <span className="button" onClick={() => handleDelete(record)}>Delete</span>
      </div>
   )
}