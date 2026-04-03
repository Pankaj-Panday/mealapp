import { Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = NativeStackScreenProps<
  MainStackParamList,
  MainRoutes.OrderConfirmation
>;

export default function OrderConfirmationScreen({ navigation, route }: Props) {
  const order = route.params.order.data;

  return (
    <View className="flex-1 bg-white items-center justify-center p-4">
      <View className="w-20 h-20 rounded-full items-center justify-center bg-green-100 mb-4">
        <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
      </View>
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Order Placed!
      </Text>
      <Text className="text-gray-500 text-sm text-center mb-6">
        Your order #{order.id} has been placed successfully.
      </Text>

      <View>
        <Text>Order Details</Text>
        <Text>Total: {order.totalAmount.toFixed(2)}</Text>
        <Text>Items: {order.totalAmount.toFixed(2)}</Text>
        <Text>Status: {order.totalAmount.toFixed(2)}</Text>
        <Text>Payment: {order.totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
}
