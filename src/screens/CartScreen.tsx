import { FlatList, Pressable, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useCartStore } from '../store/useCartStore';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import ExclusiveDeals from '../components/ExclusiveDeals';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Cart>;

export default function CartScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const items = useCartStore(state => state.items);
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalPrice = useCartStore(state => state.getTotalPrice());

  console.log('totalItems', totalItems);
  console.log('totalPrice', totalPrice);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4">Your Cart</Text>

      <View className="bg-purple-50 border border-purple-300 border-dashed rounded-lg mb-4 mx-4 p-3">
        <Text className="text-purple-600 font-bold">
          Get 60 count Prawns @299 | Use code: 299P (TCA)
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => item.id}
        className="px-4"
        renderItem={({ item }) => <CartItem item={item} />}
        ListFooterComponent={<ExclusiveDeals />}
      />

      {totalItems > 0 && (
        <View
          style={{ bottom: insets.bottom + 10 }}
          className="absolute left-4 right-4 bg-gray-600 flex-row justify-between items-center px-4 py-3 rounded-xl shadow-lg"
        >
          <Text>
            {totalItems} items | ₹{totalPrice}
          </Text>
          <Pressable>
            <Text>Proceed to Checkout</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
