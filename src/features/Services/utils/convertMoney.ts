export const formatCurrency = (value: number) => {
  const roundedValue = Math.round(value * 100) / 100;
  const parts = roundedValue.toFixed(2).toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${parts.join(',')}`;
};

export const parseCurrency = (formattedValue: string): number => {
  const cleanedValue = formattedValue.replace('R$ ', '').replace(',', '.');
  return parseFloat(cleanedValue);
};
