import { timeStartDay } from "./setHourTime";

export const qtyTypeIdBookedFunction = (bookingStateData, dates) => {
  let removeCancelBooking = bookingStateData.filter(
    (booking) => booking.status !== "Cancel"
  );
  let futureDateOrdered = removeCancelBooking.filter(
    (order) => order?.date.startDay >= timeStartDay(Date.now())
  );

  let canOrderDate = futureDateOrdered.filter(
    (order) =>
      dates.endDay < order?.date.startDay || order?.date.endDay < dates.startDay
  );

  let cannotOrderDate = futureDateOrdered.filter(
    (order) => !canOrderDate.includes(order)
  );

  let orderedOptions = cannotOrderDate.map((order) => order.options);

  let OrderedTypeRoomId = orderedOptions.map((options) =>
    options.map((option) => option.typeRoomId)
  );

  let mergeOrderedTypeRoomId = Array.from([].concat(...OrderedTypeRoomId));

  const qtyTypeRoomIdOrdered = mergeOrderedTypeRoomId.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
    {}
  );
  return qtyTypeRoomIdOrdered;
};
