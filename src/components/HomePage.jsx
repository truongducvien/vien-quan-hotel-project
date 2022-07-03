import Header from "./Header";
import SearchBar from "./SearchBar";

import { DataRoomsDemo } from "../stores/data-demo";
import MainBooking from "./main-booking/MainBooking";

export default function HomePage() {
  console.log(DataRoomsDemo);
  return (
    <div className="homePage">
      <Header />
      <SearchBar />
      <MainBooking />
    </div>
  );
}
