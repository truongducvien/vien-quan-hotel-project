import { useEffect, useState } from "react"
import moment from "moment";
import { Table } from 'antd';
import '../../../style/BookingReport.scss'
import { toVND } from '../../../general function/index'

export default function BookingReport ( {booking} ) {
   const [table, setTable] = useState()
   const [total, setTotal] = useState(0)

   useEffect(() => {
      const data = booking.options.map (opt => {
         if(opt.status === 'Checked-out'){
            return {
               key: opt.id, 
               roomType: opt.typeRoom,
               nights: booking.nights,
               roomPrice: opt.roomPrice,
               cost: opt.roomPrice * booking.nights
            }
         } else {
            return {
               key: opt.id, 
               roomType: opt.typeRoom,
               nights: 0,
               roomPrice: opt.roomPrice,
               cost: 0
            }
         }
      })
      const totalCost = data.reduce((p, c) => p + c.cost, 0)

      setTotal(totalCost);
      setTable(data)
   }, [booking])

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
         title: 'Room type',
         dataIndex: 'roomType',
         key: 'roomType',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Room price',
         dataIndex: 'roomPrice',
         key: 'roomPrice',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{toVND(item)}</div>
         )
      },
      {
         title: 'Nights',
         dataIndex: 'nights',
         key: 'nights',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{item}</div>
         )
      },
      {
         title: 'Cost',
         dataIndex: 'cost',
         key: 'cost',
         render: (item) => (
            <div style={{textAlign: 'center'}}>{toVND(item)}</div>
         )
      }
   ];


   return (
      <div className="bookingReport">
         <div className="header">
            <span>The Ocean Villas</span>
            <div>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
               <i className="fa-solid fa-star"></i>
            </div>
         </div>

         <div className="content">
            <div className="basisInfo">
               <p><span>Full name: </span>{booking.userInfo.firstName} {booking.userInfo.lastName}</p>
               <p><span>Phone number: </span>{booking.userInfo.phone}</p>
               <p><span>Email: </span>{booking.userInfo.email}</p>
               <p><span>Arrival time: </span>{booking.userInfo.arrivalTime}</p>
               <p><span>Booked day: </span> 
                  {moment(booking.date.startDay).format("MMMM Do YYYY")}
                  {' '}-{' '}
                  {moment(booking.date.endDay).format("MMMM Do YYYY")}
               </p>
               <p><span>Nights: </span>{booking.nights}</p>
               <p><span>Payment: </span>{booking.payment.method}</p>
               <p><span>Request: </span>{booking.userInfo.request}</p>
            </div>

            <div className="roomBookedInfo">
               {table && 
                  <>
                     <Table 
                        pagination={false}
                        className="bookingReportTable"
                        columns={columns} 
                        dataSource={table} 
                        size='small'
                     />
                     <div className="totalCost">
                        <span>Total cost: </span>{toVND(total)} 
                     </div>
                  </>
               }
            </div>
         </div>
         <div className="footer">
            <span>------------------</span>
         </div>
      </div>
   )
}