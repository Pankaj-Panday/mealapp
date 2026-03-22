import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../types/product';
import { useNavigation } from '@react-navigation/native';
import AnimatedPressable from './AnimatedPressable';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useCartStore } from '../store/useCartStore';

type Props = {
  product: Product;
};

const screenWidth = Dimensions.get('window').width;
const GAP = 16;
const PRODUCT_CARD_WIDTH = (screenWidth - GAP * 3) / 2;

export default React.memo(function ProductCard({ product }: Props) {
  const navigation = useNavigation();

  const displayUnit = '1 pack';

  const quantity = useCartStore(
    state => state.items.find(item => item.id === product.id)?.quantity || 0,
  );

  const updateQuantity = useCartStore(state => state.updateQuantity);

  const handleIncrement = () => {
    updateQuantity(product.id, 1);
  };

  const handleDecrement = () => {
    updateQuantity(product.id, -1);
  };

  const handleAddItem = () => {};

  return (
    <AnimatedPressable
      className="bg-white mb-4 rounded-2xl overflow-hidden shadow-md android:elevation-2"
      style={{ width: PRODUCT_CARD_WIDTH }}
      onPress={() => {}}
    >
      <View className="h-36 bg-gray-200 relative rounded-xl overflow-hidden">
        {product.imageUrl && (
          <Image
            source={{ uri: product.imageUrl }}
            resizeMode="cover"
            className="w-full h-full"
          />
        )}

        <View className="absolute text-nowrap bottom-2 left-2 px-2 py-1 rounded-full border border-gray-200 bg-white">
          <Text
            numberOfLines={1}
            className="text-gray-600 text-[11px] font-semibold"
          >
            {displayUnit}
          </Text>
        </View>

        <Pressable className="absolute top-2 right-2 p-1.5 items-center justify-center rounded-full border border-gray-200 bg-white">
          <Ionicons name="heart-outline" size={12} color="black" />
        </Pressable>
      </View>

      <View className="px-4 py-3">
        <View className="h-[40px]">
          <Text
            className="font-semibold text-[14px] leading-5 text-slate-900"
            numberOfLines={2}
          >
            {product.name}
          </Text>
        </View>

        <View className="mt-3 flex-row items-center justify-between gap-2">
          <Text className="text-[16px] font-extrabold text-slate-900">
            ₹{Number(product.price).toFixed(2)}
          </Text>

          {quantity > 0 ? (
            <View className="w-[96px] h-[34px] flex-row items-center justify-between px-2 rounded-full border border-emerald-100">
              <Pressable
                onPress={handleDecrement}
                className="w-6 items-center justify-center"
              >
                <Text className="text-lg font-black text-emerald-600">−</Text>
              </Pressable>

              <View className="items-center justify-center">
                <Text className="text-xs font-extrabold text-emerald-700">
                  {quantity}
                </Text>
              </View>

              <Pressable
                onPress={handleIncrement}
                className="w-6 items-center justify-center"
              >
                <Text className="text-base font-black text-emerald-600">+</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={handleAddItem}
              className="w-[96px] h-[34px] px-2 py-1.5 rounded-full border border-emerald-100 items-center justify-center"
            >
              <Text className="text-xs font-extrabold tracking-tighter text-emerald-600">
                ADD
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View className="border-t border-gray-200 items-center justify-center bg-violet-50 py-2 flex-row gap-1">
        <Ionicons name="flash" size={14} color="#EAB308" />

        <Text className="text-xs font-bold tracking-tight text-violet-700">
          GET IN 16 MINS
        </Text>
      </View>
    </AnimatedPressable>
  );
});
