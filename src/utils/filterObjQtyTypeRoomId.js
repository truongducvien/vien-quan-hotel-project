export const filterObjQtyTypeRoomId = (
  qtyTypeRoomIdOrdered,
  roomStateData,
  options
) => {
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
