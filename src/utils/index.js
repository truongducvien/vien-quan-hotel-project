export const ramdonNumber0To99 = Math.random() * 100;

export const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const dateString = (time) => new Date(time).toDateString();

export const timeStartDay = (time) => {
  const timeNow = new Date(time);
  const setTime = timeNow.setHours(12, 0, 0);
  return setTime;
};

export const timeEndDay = (time) => {
  const timeNow = new Date(time);
  const setTime = timeNow.setHours(11, 59, 0);
  return setTime;
};

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
    Number(`${typeRoom.roomList.length}`),
  ]);

  let objQtyRoomsOfTypeRoom = Object.fromEntries(arrQtyRoomsOfTypeRoom);

  let diffMinus = Object.keys(objQtyRoomsOfTypeRoom).reduce((diff, key) => {
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
  }, {});
  // Qty TypeRoomId of options of orderInfo >>>>>>>>
  let optionTypeRoomId = options.map((option) => option.typeRoomId);

  let mergeOptionTypeRoomId = Array.from([].concat(...optionTypeRoomId));

  const qtyTypeRoomIdOption = mergeOptionTypeRoomId.reduce(
    (acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc),
    {}
  );
  console.log("qtyTypeRoomIdOption :>> ", qtyTypeRoomIdOption);

  let diffMinusOptions = Object.keys(diffMinus).reduce((diff, key) => {
    if (qtyTypeRoomIdOption[key] > diffMinus[key]) {
      return diff;
    } else if (qtyTypeRoomIdOption[key] <= diffMinus[key]) {
      return {
        ...diff,
        [key]: diffMinus[key] - qtyTypeRoomIdOption[key],
      };
    } else
      return {
        ...diff,
        [key]: diffMinus[key],
      };
  }, {});

  return diffMinusOptions;
};

export const availableRooms = (objQtyTypeId, roomStateData) => {
  let arrayDiff = Object.keys(objQtyTypeId);

  const arrayDiffNum = arrayDiff.map((str) => {
    return Number(str);
  });

  let newAvailableRooms = roomStateData.filter((typeRoom) =>
    arrayDiffNum.includes(typeRoom.id)
  );
  return newAvailableRooms;
};
