// Chưa những hàm tiện ích trong app
// Ví dụ
export const ramdonNumber0To99 = Math.random() * 100;

export const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};

export const dateString = (time) => new Date(time).toDateString();
