
export const moneyConverter = ( quantity ) => {
  return Intl.NumberFormat(
      'en-US',
      {style: 'currency', currency: 'USD', minimumFractionDigits: 2}
  ).format(quantity)
}