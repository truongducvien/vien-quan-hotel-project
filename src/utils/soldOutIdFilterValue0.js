export const soldOutIdFilterValue0 = (objQtyTypeId) => {
  let filterValue0 = Object.keys(objQtyTypeId).reduce((filterValue0, key) => {
    if (objQtyTypeId[key] === 0)
      return {
        ...filterValue0,
        [key]: objQtyTypeId[key],
      };
    return filterValue0;
  }, {});

  const typeId = Object.keys(filterValue0);
  console.log("soldOut ID :>> ", typeId);
  return typeId;
};
