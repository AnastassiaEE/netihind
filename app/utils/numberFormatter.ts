export const formatMoney = (value?: number) => {
  if (value === undefined) return '';
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
};