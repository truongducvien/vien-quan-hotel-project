export const availableRoomsFunction = (objQtyTypeId, roomStateData) => {
  let arrayDiff = Object.keys(objQtyTypeId);

  let newAvailableRooms = roomStateData.filter((typeRoom) =>
    arrayDiff.includes(typeRoom.id)
  );
  return newAvailableRooms;
};
