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
