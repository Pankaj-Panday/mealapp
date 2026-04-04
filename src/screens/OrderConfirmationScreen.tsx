import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList, RootRoutes } from '../types/routes';
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

      <View className="w-full bg-gray-50 rounded-lg mb-6 p-4">
        <Text className="font-semibold mb-2">Order Details</Text>
        <Text className="text-gray-600 text-sm">
          Total: {order.totalAmount.toFixed(2)}
        </Text>
        <Text className="text-gray-600 text-sm">
          Items: {order.items.length}
        </Text>
        <Text className="text-gray-600 text-sm">Status: {order.status}</Text>
        <Text className="text-gray-600 text-sm">
          Payment: {order.paymentMethod}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-green-600 py-3 px-6 rounded-full"
        onPress={() =>
          navigation.navigate('Tabs', {
            screen: MainRoutes.Home,
          })
        }
      >
        <Text className="text-white font-semibold text-base">
          Continue Shopping
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-green-600 font-semibold text-base">
          View Orders
        </Text>
      </TouchableOpacity>
    </View>
  );
}
