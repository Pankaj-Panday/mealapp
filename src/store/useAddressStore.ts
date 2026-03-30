import { create } from 'zustand';
import { Address, AddressState } from '../types/address';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const intitialAddresses = [
  {
    id: '1',
    name: 'Pankaj Panday',
    type: 'Home',
    mobile: '9876543210',
    flatNo: '12A',
    buildingName: 'Shiv Residency',
    street: 'MG Road',
    landmark: 'Near Hanuman Mandir',
    pincode: '262501',
    locality: 'Pithoragarh',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    type: 'Work',
    mobile: '9123456780',
    flatNo: '304',
    buildingName: 'Tech Park Towers',
    street: 'Sector 62',
    landmark: 'Opposite Metro Station',
    pincode: '201309',
    locality: 'Noida',
  },
] satisfies Address[];

export const useAddressStore = create<AddressState>()(
  persist<AddressState>(
    set => ({
      addresses: intitialAddresses,
      selectedAddressId: '1',
      addAddress: newAddress =>
        set(state => {
          const id = Date.now().toString();
          return {
            addresses: [...state.addresses, { ...newAddress, id: id }],
          };
        }),
      updateAddress: (id, address) =>
        set(state => ({
          addresses: state.addresses.map(addr =>
            addr.id === id ? { ...addr, ...address } : addr,
          ),
        })),
      removeAddress: id =>
        set(state => ({
          addresses: state.addresses.filter(addr => addr.id !== id),
        })),
      selectAddress: id =>
        set(state => ({
          selectedAddressId: id,
        })),
    }),
    {
      name: 'address-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
