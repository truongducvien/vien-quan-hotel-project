import React, { useContext } from "react";
import * as RiIcons from "react-icons/ri";
import { CustomerContext } from "../../../providers/CustomerContext";
import { formatPrice } from "../../../utils";

function RoomOrdered({ option, index }) {
  const { customerBook, setCustomerBook, options, setOptions } =
    useContext(CustomerContext);

  const totalRoomPrice = option.roomPrice * customerBook.nights;
  const totalRoomPriceString = formatPrice(totalRoomPrice);

  const handleRemoveRoomBook = (id) => {
    const findOptions = customerBook.options.map((op) => {
      if (op.id === id) {
        return { ...op, roomName: "", roomPrice: 0 };
      }
      return op;
    });
    setOptions(findOptions);
    setCustomerBook({ ...customerBook, options });
    localStorage.setItem("CUSTOMER-HOTEL", JSON.stringify(customerBook));
  };

  return (
    <div className="room-select">
      <div className="flex">
        <div className="booking-heading-room">
          <i>Room {index + 1}:</i> {option.roomName}
        </div>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleRemoveRoomBook(option.id)}
        >
          <RiIcons.RiDeleteBinLine />
        </span>
      </div>
      <div className="flex">
        <div>
          <p>
            {option.adult + option.children} guests {customerBook.nights} night
          </p>
        </div>
        <span className="room-select-price">VND {totalRoomPriceString}</span>
      </div>
    </div>
  );
}

export default RoomOrdered;
