import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { Product } from '../types/product';
import { useNavigation } from '@react-navigation/native';
import AnimatedPressable from './AnimatedPressable';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  product: Product;
};

const screenWidth = Dimensions.get('window').width;
const GAP = 16;
const PRODUCT_CARD_WIDTH = (screenWidth - GAP * 3) / 2;

export default React.memo(function ProductCard({ product }: Props) {
  const navigation = useNavigation();

  const quantity = 1;
  const unit = 'pack';

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
            {quantity} {unit}
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

        <View className="mt-2 flex-row items-center justify-between">
          <View className="flex-row items-baseline">
            <Text className="text-[16px] font-extrabold text-slate-900">
              ₹{Number(product.price).toFixed(2)}
            </Text>

            <Text className="ml-1 text-[11px] text-gray-500">/ {unit}</Text>
          </View>

          <Pressable className="px-2.5 py-1 rounded-md bg-green-600">
            <Text className="text-[11px] font-semibold text-white">ADD</Text>
          </Pressable>
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
