export const formatPrice = (num) => {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1,");
};
