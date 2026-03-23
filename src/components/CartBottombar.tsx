import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export default function CartBottombar() {
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  if (totalItems === 0) return null;

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-4 py-3 bg-emerald-500 rounded-t-3xl shadow-lg shadow-black/10 android:elevation-3"
      style={{ paddingBottom: insets.bottom + 10 }}
    >
      <Text className="text-white font-bold">
        {totalItems} Items | ₹{totalPrice}
      </Text>
      <Pressable
        onPress={() => navigation.navigate(MainRoutes.Cart)}
        className="bg-white px-4 py-2 rounded-lg"
      >
        <Text className="text-emerald-500 font-bold">View Cart</Text>
      </Pressable>
    </View>
  );
}
