import { Pressable, Text, View } from 'react-native';
import React from 'react';

type Props = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  containerClassName?: string;
};

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  containerClassName,
}: Props) {
  return (
    <View
      className={`flex-1 relative h-[34px] flex-row items-center justify-center px-2 rounded-full border border-emerald-100 bg-emerald-50 ${containerClassName}`}
    >
      <Pressable
        onPress={onDecrement}
        className="px-3 absolute left-0 h-full items-center justify-center"
      >
        <Text className="text-lg font-black text-emerald-600">−</Text>
      </Pressable>

      <View className="items-center justify-center">
        <Text className="text-xs font-extrabold text-emerald-700">
          {quantity}
        </Text>
      </View>

      <Pressable
        onPress={onIncrement}
        className="px-3 absolute right-0 h-full items-center justify-center"
      >
        <Text className="text-base font-black text-emerald-600">+</Text>
      </Pressable>
    </View>
  );
}
