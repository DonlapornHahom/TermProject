export const formatPrice = (amount) => {
  if (typeof amount == "undefined") {
    return "";
  }
  const formattedPrice = new Intl.NumberFormat("en-US").format(amount);
  // return amount.toString();
  return formattedPrice;
};
