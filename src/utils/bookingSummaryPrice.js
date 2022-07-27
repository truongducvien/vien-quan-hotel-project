import { formatPrice } from "./formatPrice";

export const bookingSummaryPrice = (orderInfo, options) => {
  let totalPriceRoom = 0;

  options.forEach((option) => {
    totalPriceRoom += option.roomPrice * orderInfo.nights;
  });

  let tax = parseFloat((totalPriceRoom * 10) / 100).toFixed(0);

  let serviceCharge = parseFloat((totalPriceRoom * 5) / 100).toFixed(0);

  let sumTotal = totalPriceRoom + parseFloat(tax) + parseFloat(serviceCharge);
  let sumTotalString = formatPrice(sumTotal);

  return sumTotalString;
};
