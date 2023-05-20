export const formatCurrency = (
  value: string,
  notation: Intl.NumberFormatOptions['notation'] = 'standard',
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: notation,
  }).format(Number(value));
};

export const formatPercentage = (value: string) => {
  return new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
};
