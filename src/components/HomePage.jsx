import { useContext, useEffect } from "react";
import { CustomerContext } from "../providers/CustomerContext";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { v4 } from "uuid";

export default function HomePage() {
  const { orderInfo, setOptions, setOrderInfo } = useContext(CustomerContext);

  const handleBookNow = () => {
    let newOptions = [
      {
        id: v4(),
        adult: 2,
        children: 0,
        typeRoomId: 0,
        typeRoom: "",
        roomPrice: 0,
        roomName: "",
        maxPerson: 6,
      },
    ];
    setOptions(newOptions);

    const storedOrderInfo = localStorage.getItem("ORDER_INFO");

    localStorage.setItem(
      "ORDER_INFO",
      JSON.stringify({ ...orderInfo, options: newOptions })
    );
    setOrderInfo(JSON.parse(storedOrderInfo));
  };

  return (
    <div className="homePage">
      <Header handleBookNow={handleBookNow} />
      <SearchBar handleBookNow={handleBookNow} />
    </div>
  );
}
