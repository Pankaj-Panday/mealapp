import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useCartStore } from '../store/useCartStore';
import QuantityStepper from './QuantityStepper';
import { Product } from '../types/product';

type Deal = Omit<Product, 'categoryId' | 'createdAt'> & { badge: string };

export default function ExclusiveDeals() {
  const exclusiveDeals: Deal[] = [
    {
      id: '69bd81fd6822d24e9df90d5f',
      name: 'Pasta',
      price: 90,
      imageUrl: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9',
      badge: '10% OFF',
    },
    {
      id: '69bd81fb6822d24e9df90d55',
      name: 'Good Day Biscuit',
      price: 30,
      imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e',
      badge: '20% OFF',
    },
    {
      id: '69bd81fb6822d24e9df90d51',
      name: 'Mustard Oil',
      price: 200,
      imageUrl: 'https://images.unsplash.com/photo-1615485737651-3a9f1a0e0121',
      badge: '30% OFF',
    },
  ];

  const items = useCartStore(state => state.items);

  const updateQuantity = useCartStore(state => state.updateQuantity);
  const addItem = useCartStore(state => state.addItem);

  const handleIncrement = (id: string) => {
    updateQuantity(id, 1);
  };

  const handleDecrement = (id: string) => {
    updateQuantity(id, -1);
  };

  const handleAddItem = (deal: any) => {
    addItem({
      id: deal.id,
      name: deal.name,
      price: deal.price,
      imageUrl: deal.imageUrl,
    });
  };

  return (
    <View className="mt-6">
      <Text className="text-lg font-bold mb-4">Exclusive Offers For You</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-6"
        contentContainerStyle={{ gap: 16 }}
      >
        {exclusiveDeals.map(deal => {
          const quantity =
            items.find(item => item.id === deal.id)?.quantity || 0;
          return (
            <View
              key={deal.id}
              className="w-48 bg-white shadow-sm flex-col justify-between rounded-lg p-3"
            >
              <Text className="bg-pink-500 text-white px-2 py-1 rounded-full mb-2 text-xs font-bold self-start">
                {deal.badge}
              </Text>
              <Image
                source={{ uri: deal.imageUrl }}
                className="h-28 w-full rounded-md mb-2 bg-gray-100"
              />
              <Text className="text-sm  font-semibold mb-1" numberOfLines={2}>
                {deal.name}
              </Text>
              <Text className="text-lg font-extrabold mb-2">₹{deal.price}</Text>

              {quantity > 0 ? (
                <QuantityStepper
                  containerClassName="rounded-lg"
                  quantity={quantity}
                  onIncrement={() => handleIncrement(deal.id)}
                  onDecrement={() => handleDecrement(deal.id)}
                />
              ) : (
                <Pressable
                  onPress={() => handleAddItem(deal)}
                  className="flex-1 h-[34px] rounded-lg bg-emerald-500 items-center justify-center shadow-sm"
                >
                  <Text className="text-xs font-extrabold tracking-tighter text-white">
                    ADD
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
