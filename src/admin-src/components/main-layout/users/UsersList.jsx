import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { 
   fetchUsersDataAction,
   deleteUserDataAction,
   updateUserDataAction
} from '../../../store/slices/usersSlice'

import { Button, Modal, Table } from "antd";

import { Loading } from '../../shared-components/Loading';
import UserEditForm from "./UserEditForm";
import '../../../style/UsersList.scss'

export default function UsersList () {
   const dispatch = useDispatch();
   const users = useSelector(state => state.usersReducers.users);
   const isLoading = useSelector(state => state.usersReducers.isLoading);

   const [tableData, setTableData] = useState([])
   const [isRoomModalVisible, setIsRoomModalVisible] = useState(false)
   const [currentUserSelection, setCurrentUserSelection] = useState()
   const [currentUserChange, setCurrentUserChange] = useState()

   useEffect(() => {
      dispatch(fetchUsersDataAction())
   }, []);

   useEffect(()=> {
      let data = users?.map(user => {
         return {
            key: user.id,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role,
            password: user.password
         }
      })

      setTableData(data)
   }, [users])

   const columns = [
      {
         title: 'Index',
         dataIndex: "index",
         key: 'index',
         render: (item, obj, index) => (
            <div style={{textAlign: 'center'}}>{index + 1}</div>
         )
      },
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
         render: (item, obj, index) => (
            <div style={{textAlign: 'center'}}>{index + 1}</div>
         )
      },
      {
         title: 'First name',
         dataIndex: 'firstName',
         key: 'firstName',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Last name',
         dataIndex: 'lastName',
         key: 'lastName',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Phone Number',
         dataIndex: 'phone',
         key: 'phone',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Role',
         dataIndex: 'role',
         key: 'role',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <button 
               className={`usersDetailButton ${currentUserSelection?.id === record.id? 'active': ''}`} 
               onClick={()=>handleClickDetail(record)}
            >Detail</button>
         ),
      },
   ];

   const handleCurrentUserChange = (change) => {
      setCurrentUserChange(change)
   }

   const handleClickDetail = (record) => {
      setCurrentUserSelection({...record});
      setIsRoomModalVisible(true)
   }
   
   const handleCancel = () => {
      setIsRoomModalVisible(false)
      setCurrentUserSelection( {...currentUserSelection} )
   }
   
   const handleDelete = () => {
      if(window.confirm(`Delete ${currentUserSelection.firstName} ${currentUserSelection.lastName}?`)){
         setIsRoomModalVisible(false)
         dispatch(deleteUserDataAction(currentUserSelection.id))
      }
   }

   const handleOk = () => {
      if(window.confirm('Save changed?')){
         setIsRoomModalVisible(false)
         dispatch(updateUserDataAction(currentUserChange))
      }
   }

   useEffect(() => {
      if(!isRoomModalVisible){
         setCurrentUserSelection('')
      }
   },[isRoomModalVisible])

   return (
      <div className="usersList">
         {isLoading? (
            <Loading />
         ):(
            <>
               <Table columns={columns} dataSource={tableData} />

               <Modal
                  className="userDetail-container"
                  title="User detail:" 
                  visible={isRoomModalVisible} 
                  onOk={()=>handleOk()} 
                  onCancel={handleCancel}
                  footer={[
                     <Button className="modalButton" key='cancel' onClick={handleCancel}>Cancel</Button>,
                     <Button className="modalButton" key='delete' onClick={handleDelete}>Delete</Button>,
                     <Button className="modalButton" key='ok' onClick={handleOk}>OK</Button>
                  ]}
               >
                  <UserEditForm 
                     currentUserSelection={currentUserSelection}
                     handleCurrentUserChange={handleCurrentUserChange}
                  />
               </Modal>
            </>
         )}
      </div>
   )
}