import { create } from 'zustand';
import { CartState } from '../types/cart';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],

      addItem: newItem => {
        set(state => {
          const existingItem = state.items.find(item => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { ...newItem, quantity: 1 }],
          };
        });
      },

      removeItem: id => {
        set(state => {
          return {
            items: state.items.filter(item => item.id !== id),
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
        });
      },

      updateQuantity: (id, delta) => {
        set(state => {
          const existingItem = state.items.find(item => item.id === id);
          if (!existingItem) return state;

          const newQuantity = Math.max(0, existingItem.quantity + delta);
          if (newQuantity <= 0) {
            return {
              items: state.items.filter(item => item.id !== id), // remove item if quantity is 0 or less
            };
          }

          return {
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
          };
        });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
