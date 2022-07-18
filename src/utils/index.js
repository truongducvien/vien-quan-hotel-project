// Chưa những hàm tiện ích trong app
// Ví dụ
export const ramdonNumber0To99 = Math.random() * 100;

export const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const dateString = (time) => new Date(time).toDateString();

export const timeStartDay = (time) => {
  const timeNow = new Date(time);
  const setTime = timeNow.setHours(12, 0, 0);
  let timeAfter = new Date(setTime);
  return timeAfter.getTime();
};

export const timeEndDay = (time) => {
  const timeNow = new Date(time);
  const setTime = timeNow.setHours(11, 59, 0);
  let timeAfter = new Date(setTime);
  return timeAfter.getTime();
};
