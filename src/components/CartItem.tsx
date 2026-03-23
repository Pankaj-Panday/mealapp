import { Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { CartItem as CartItemType } from '../types/cart';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCartStore } from '../store/useCartStore';
import QuantityStepper from './QuantityStepper';

type Props = {
  item: CartItemType;
};

export default function CartItem({ item }: Props) {
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);

  const handleIncrement = () => {
    updateQuantity(item.id, 1);
  };

  const handleDecrement = () => {
    updateQuantity(item.id, -1);
  };

  return (
    <View className="bg-white rounded-xl justify-between p-4 mb-4 flex-row shadow-sm">
      <View className="flex-1 pr-3">
        <Text className="text-base font-semibold">{item.name}</Text>
        <Text className="text-lg font-extrabold mt-1">
          ₹{item.price * (item.quantity || 1)}
        </Text>
        <Text className="text-sm text-gray-500">1 Pack</Text>

        <View className="flex-row mt-2 items-center gap-1">
          <Ionicons name="bicycle" size={16} color={'#6b7280'} />
          <Text className="text-sm text-gray-500">Today in 20 mins</Text>
        </View>

        <Pressable
          onPress={() => removeItem(item.id)}
          className="flex-row mt-2 items-center gap-1 self-start px-2 py-1 rounded-md bg-red-50 active:bg-red-100"
        >
          <Ionicons name="trash" size={16} color={'#ef4444'} />
          <Text className="text-sm text-red-400">Remove</Text>
        </Pressable>
      </View>

      <View className="items-center w-32">
        {item.imageUrl && (
          <Image
            source={{ uri: item.imageUrl }}
            className="w-24 h-24 rounded-lg mb-3"
          />
        )}

        <View className="w-full">
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </View>
      </View>
    </View>
  );
}
