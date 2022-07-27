import { timeStartDay } from "./setHourTime";

export const filterObjQtyTypeRoomId = (
  bookingStateData,
  roomStateData,
  dates,
  options
) => {
  let futureDateOrdered = bookingStateData.filter(
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

  let arrQtyRoomsOfTypeRoom = roomStateData.map((typeRoom) => [
    `${typeRoom.id}`,
    Number(`${typeRoom.roomsList.length}`),
  ]);

  let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

  let qtyAvailableIdRoom = Object.keys(objQtyRoomsOfTypeRoom).reduce(
    (diff, key) => {
      if (qtyTypeRoomIdOrdered[key] >= objQtyRoomsOfTypeRoom[key]) {
        return diff;
      } else if (qtyTypeRoomIdOrdered[key] < objQtyRoomsOfTypeRoom[key]) {
        return {
          ...diff,
          [key]: objQtyRoomsOfTypeRoom[key] - qtyTypeRoomIdOrdered[key],
        };
      } else
        return {
          ...diff,
          [key]: objQtyRoomsOfTypeRoom[key],
        };
    },
    {}
  );
  console.log("qtyAvailableIdRoom :>> ", qtyAvailableIdRoom);
  // Qty TypeRoomId of options of orderInfo >>>>>>>>
  let optionTypeRoomId = options.map((option) => option.typeRoomId);

  let mergeOptionTypeRoomId = Array.from([].concat(...optionTypeRoomId));

  const qtyTypeRoomIdOption = mergeOptionTypeRoomId.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
    {}
  );
  console.log("qtyTypeRoomIdOption :>> ", qtyTypeRoomIdOption);
  // if qty rooms of optionsOrder === qty rooms of availableRoom ===> SOLD OUT
  let diffMinusOptions = Object.keys(qtyAvailableIdRoom).reduce(
    (diffMinusOptions, key) => {
      if (qtyTypeRoomIdOption[key] === qtyAvailableIdRoom[key]) {
        return {
          ...diffMinusOptions,
          [key]: Number(0),
        };
      }
      return {
        ...diffMinusOptions,
        [key]: qtyAvailableIdRoom[key],
      };
    },
    {}
  );

  return diffMinusOptions;
};
