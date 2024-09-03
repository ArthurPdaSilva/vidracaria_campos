export interface CustomerValidation {
  id?: string;
  name: string;
  customerType: string;
  cpfcnpj?: string;
  email?: string;
  phone?: string;
  address: AddressValidation;
}

export interface AddressValidation {
  address: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
  landmark?: string;
}
