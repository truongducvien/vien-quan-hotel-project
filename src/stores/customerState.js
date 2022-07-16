const customerState = {
  date: { startDay: "", endDay: "" },
  room: 0,
  guests: { adult: 0, children: 0 },
  roomName: "",
  totalRoomPrice: 0,
  customerInfo: { name: "", age: "", email: "", phone: "" },
  payment: {
    method: "",
    bankingInfo: { nameOnCard: "", cardNumber: "" },
  },
};

export default customerState;
