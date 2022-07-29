import TextCollapsed from "./TextCollapsed";
import ImageCarousel from "./ImageCarousel";
import { Space } from "antd";

import TableButton from "./TableButton";

export const columns = [
  {
    title: "Index",
    dataIndex: "key",
    key: "index",
    render: (item, obj, index) => index + 1,
  },
  {
    title: "Room Type",
    dataIndex: "typeRoom",
    key: "type",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Rooms Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Maximum Guests",
    dataIndex: "maxPerson",
    key: "maxPerson",
  },
  {
    title: "Bed",
    dataIndex: "bed",
    key: "bed",
  },
  {
    title: "Bathrooms",
    dataIndex: "bathrooms",
    key: "bathrooms",
  },
  {
    title: "Convenient",
    dataIndex: "convenient",
    key: "convenient",
    render: (text) =>
      text.length > 250 ? <TextCollapsed text={text} /> : text,
  },
  {
    title: "Introduction",
    dataIndex: "introduction",
    key: "introduction",
    render: (text) =>
      text.length > 250 ? <TextCollapsed text={text} /> : text,
  },
  {
    title: "Image",
    dataIndex: "imageUrl",
    key: "imageUrl",
    render: (imageLinks) => <ImageCarousel imageLinks={imageLinks} />,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <TableButton record={record} />
      </Space>
    ),
  },
];
