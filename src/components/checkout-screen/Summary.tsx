import { Text, View } from 'react-native';
import React from 'react';

type Props = {
  subtotal: string;
  deliveryFee: string;
  total: string;
};

export default function Summary({ subtotal, deliveryFee, total }: Props) {
  return (
    <View className="bg-white rounded-b-2xl p-4 shadow">
      <View className="flex-row justify-between">
        <Text className="text-gray-600">Sub Total:</Text>
        <Text className="font-semibold">{subtotal}</Text>
      </View>

      <View className="flex-row justify-between mt-2">
        <Text className="text-gray-600">Delivery Fee</Text>
        <Text className="font-semibold">{deliveryFee}</Text>
      </View>

      <View className="flex-row justify-between mt-3 border-t border-gray-100 pt-3">
        <Text className="text-gray-800 font-bold">Total</Text>
        <Text className="font-bold">{total}</Text>
      </View>
    </View>
  );
}
