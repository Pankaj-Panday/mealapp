import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  totalItems: number;
  totalPrice: number;
  isProcessing: boolean;
  onPress?: () => void;
};

export default function CheckoutBottomBar({
  totalItems,
  totalPrice,
  isProcessing,
  onPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ bottom: insets.bottom + 10 }}
      className="absolute left-4 right-4"
    >
      <Pressable
        onPress={onPress}
        className={`bg-green-600 rounded-2xl py-4 flex-row justify-between items-center px-5 shadow-lg ${isProcessing ? 'opacity-50' : 'opacity-100'}`}
      >
        <View>
          <Text className="text-white font-semibold">Proceed to Payment</Text>
          <Text className="text-white text-sm opacity-90">
            {totalItems} item{totalItems > 1 ? 's' : ''} • ₹
            {totalPrice.toFixed(2)}
          </Text>
        </View>

        <View className="bg-white px-4 py-2 rounded-lg">
          <Text className="text-green-600 font-semibold">
            {isProcessing ? 'Processing...' : 'CONTINUE'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
