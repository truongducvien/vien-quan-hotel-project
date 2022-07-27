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
