
import ImageCarousel from './ImageCarousel';
import { Space } from 'antd'

import TableButton from './TableButton';
import { toVND } from '../../general function';

export const roomsColumnTable = [
   {
      title: 'Index',
      dataIndex: 'key',
      key: 'index',
      render: (item, obj, index) => (
         <div style={{textAlign: 'center'}}>{index + 1}</div>
      )
   },
   {
      title: 'Room Type',
      dataIndex: 'typeRoom',
      key: 'type',
   },
   {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (item) => (
         <div style={{textAlign: 'center'}}>{toVND(item)}</div>
      )
   },
   {
      title: 'Rooms Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (item) => (
         <div style={{textAlign: 'center'}}>{item}</div>
      )
   },
   {
      title: 'Maximum Guests',
      dataIndex: 'maxPerson',
      key: 'maxPerson',
      render: (item) => (
         <div style={{textAlign: 'center'}}>{item}</div>
      )
   },
   {
      title: 'Bed',
      dataIndex: 'bed',
      key: 'bed',
   },
   {
      title: 'Bathrooms',
      dataIndex: 'bathrooms',
      key: 'bathrooms',
   },
   {
      title: 'Convenient',
      dataIndex: 'convenient',
      key: 'convenient',
      // render: ( text => text.length > 250? <TextCollapsed text={text} /> : text)
   },
   {
      title: 'Introduction',
      dataIndex: 'introduction',
      key: 'introduction',
      // render: ( text => text.length > 250? <TextCollapsed text={text} /> : text)
   },
   {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageLinks =>  <ImageCarousel imageLinks={imageLinks}/>)
   },
   {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
         <Space size="middle">
            <TableButton record={record}/>
         </Space>
      ),
    },
];
