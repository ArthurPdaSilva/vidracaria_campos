import { AddressValidation } from '../../Customers/types';

export const FormatAddress = (
  address: AddressValidation | undefined,
): string => {
  if (address) {
    return `${address.address || ''}, ${address.number || ''}, ${address.city || ''}, ${address.state || ''}, ${address.zipCode || ''} - ${address.landmark || ''}`;
  }
  return '';
};
