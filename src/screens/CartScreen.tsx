import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useCartStore } from '../store/useCartStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/CartItem';
import ExclusiveDeals from '../components/ExclusiveDeals';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Cart>;

export default function CartScreen({ navigation, route }: Props) {
  const items = useCartStore(state => state.items);

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
    </SafeAreaView>
  );
}
