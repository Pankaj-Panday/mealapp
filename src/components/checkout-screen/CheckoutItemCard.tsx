import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CartItem } from '../../types/cart';

type Props = {
  item: CartItem;
};

export default function CheckoutItemCard({ item }: Props) {
  return (
    <View
      key={item.id}
      className="flex-row items-center py-2 border-b border-gray-100"
    >
      <Image
        source={{
          uri: item.imageUrl || 'https://via.placeholder.com/80',
        }}
        className="w-16 h-16 rounded-md mr-3"
      />

      <View className="flex-1">
        <Text className="font-semibold" numberOfLines={2}>
          {item.name}
        </Text>

        <Text className="text-sm text-gray-500 mt-1">
          {item.quantity} x ₹{item.price}
        </Text>
      </View>

      <Text className="font-semibold">
        ₹{(item.price * (item.quantity || 1)).toFixed(0)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
