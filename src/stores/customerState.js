const customerState = {
   date: { startDay: '', endDay: ''},
   room: 0,
   guests: {adults: 0, children: 0, infants: 0},
   roomName: '',
   totalRoomPrice: 0,
   customerInfo: {name: '', age: '', email: '', phone:''},
   payment: {
      method: '', 
      bankingInfo:{nameOnCard: '', cardNumber: ''}
      }

}

export default customerState;