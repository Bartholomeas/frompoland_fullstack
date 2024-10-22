export const getApproximateExchangedAmount = (amount: number, exchangeRate: number | undefined) => {
  if (isNaN(amount) || !exchangeRate) return 0;
  return parseFloat((Math.round(amount * exchangeRate * 100) / 100).toFixed(2));
};
