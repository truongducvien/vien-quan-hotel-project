import { useContext, useEffect } from "react";
import { CustomerContext } from "../../providers/CustomerContext";
import Header from "./HomeHeader";
import { v4 } from "uuid";
import BookSearchBar from "./HomeSearchBar";
import { SectionViLla } from "./SectionViLla";
import "./styles/home.scss";
import { SectionCol } from "./SectionCol";
import { SectionMap } from "./SectionMap";
import { HomeFooter } from "./HomeFooter";

export default function HomePage() {
  const { orderInfo, setOptions, setOrderInfo } = useContext(CustomerContext);

  useEffect(() => {
    let newOptions = [
      {
        id: v4(),
        adult: 2,
        children: 0,
        typeRoomId: 0,
        typeRoom: "",
        roomPrice: 0,
        roomName: "",
        maxPerson: 10,
        status: "Booked",
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

  return (
    <div className="home-page">
      <Header />
      <BookSearchBar />
      <SectionCol />
      <SectionViLla />
      <SectionMap />
      <HomeFooter />
    </div>
  );
}
