export type Address = {
  id: string;
  name: string;
  type: string;
  mobile: string;
  flatNo: string;
  buildingName: string;
  street: string;
  landmark: string;
  pincode: string;
  locality: string;
};

export type AddressState = {
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  selectAddress: (id: string) => void;
};
