export const formatMoney = (value: number) => {
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(2);
}