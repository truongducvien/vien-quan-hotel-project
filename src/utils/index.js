// Chưa những hàm tiện ích trong app
// Ví dụ
export const ramdonNumber0To99 = Math.random() * 100;

export const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const toLocaleStringDate = (date) => {
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
