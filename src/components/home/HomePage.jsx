import { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerContext";
import Header from "./HomeHeader";
import { v4 } from "uuid";
import BookSearchBar from "./HomeSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../stores/slices/roomsSlice";
import { fetchBookingAction } from "../../stores/slices/bookingsSlice";

export default function HomePage() {
  const { orderInfo, setOptions, setOrderInfo } = useContext(CustomerContext);
  const roomState = useSelector((state) => state?.room?.roomState);
  const bookingState = useSelector((state) => state?.booking?.bookingState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoomAction());
    dispatch(fetchBookingAction());
    console.log("bookingState.data :>> ", bookingState.data);
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
    setOrderInfo({ ...orderInfo, options: newOptions });
    const storedOrderInfo = localStorage.getItem("ORDER_INFO");
    localStorage.setItem(
      "ORDER_INFO",
      JSON.stringify({ ...orderInfo, options: newOptions })
    );
    setOrderInfo(JSON.parse(storedOrderInfo));
  }, []);

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
    setOrderInfo({ ...orderInfo, options: newOptions });
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
      <BookSearchBar handleBookNow={handleBookNow} />
      <div style={{ height: "500px" }}></div>
    </div>
  );
}
