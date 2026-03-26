import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { PaymentMethod } from '../../types/common';

type Props = {
  paymentMethod: string;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

export default function PaymentMethodSelect({
  paymentMethod,
  onPaymentMethodChange,
}: Props) {
  return (
    <View>
      <Text className="text-gray-700 font-semibold mt-6 mb-3">
        Payment Method
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow">
        <TouchableOpacity
          className="flex-row items-center mb-4"
          onPress={() => onPaymentMethodChange('ONLINE')}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'ONLINE' ? 'border-green-600 bg-green-600' : 'border-gray-400'}`}
          />
          <Text className="ml-3 text-gray-800">Pay Online (Razorpay)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => onPaymentMethodChange('COD')}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 ${paymentMethod === 'COD' ? 'border-green-600 bg-green-600' : 'border-gray-400'}`}
          />
          <Text className="ml-3 text-gray-800">Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
