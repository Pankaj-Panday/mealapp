import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BannerCarousel from '../components/BannerCarousel';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/categories';
import CategoryCard from '../components/CategoryCard';
import CategorySkeletonRow from '../components/skeletons/CategorySkeletonRow';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Home>;

export default function HomeScreen({ navigation, route }: Props) {
  const [query, setQuery] = useState('');
  const products = [
    {
      id: '1',
      name: 'Cow Milk Packet',
      price: 70,
      imageUrl:
        'https://cdn.zeptonow.com/production/tr:w-403,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/a05ee90f-d81b-43a5-8f40-8c16a981730e.jpeg',
    },
    {
      id: '2',
      name: 'Buffalo Milk',
      price: 80,
      imageUrl:
        'https://www.bbassets.com/media/uploads/p/l/40149834_1-nandini-shubham-milk.jpg',
    },
    {
      id: '3',
      name: 'Ghee (500g)',
      price: 500,
      imageUrl: 'https://via.placeholder.com/300x200?text=Ghee',
    },
    {
      id: '4',
      name: 'Paneer Block',
      price: 200,
      imageUrl: 'https://via.placeholder.com/300x200?text=Paneer',
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = data?.data || [];

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-green-700">
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#15803d'}
        translucent={false}
      />
      <View className="bg-green-700">
        <Header />
        <View className="px-4 pb-4">
          <SearchBar value={query} onChange={setQuery} />
        </View>
      </View>

      <ScrollView className="flex-1 bg-white rounded-t-3xl">
        <View className="pb-10">
          <View className="pt-4">
            <BannerCarousel />
          </View>

          {/* Categories */}
          <View className="px-4 mt-4">
            <Text className="text-xl font-bold">New Kitchen Essentials</Text>

            {isLoading ? (
              <CategorySkeletonRow />
            ) : (
              <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <CategoryCard
                    category={item}
                    onPress={() =>
                      navigation.navigate(MainRoutes.Category, {
                        categoryId: item.id,
                      })
                    }
                  />
                )}
                contentContainerStyle={{ marginTop: 16 }}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            )}
          </View>

          <View className="px-4 mt-3">
            <View className="flex-row mt-3  justify-between items-center">
              <Text className="text-xl font-bold">Flash Sale</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>

          <View className="px-4 mt-3">
            <View className="flex-row mt-3  justify-between items-center">
              <Text className="text-xl font-bold">Pujo Special</Text>
              <Text className="text-purple-600">View All</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {products?.map(product => (
              <View
                key={product.id}
                className="mr-4 mt-4 w-60 mb-4 bg-white rounded-xl overflow-hidden"
              >
                <View className="w-full h-40 overflow-hidden">
                  <Image
                    source={{ uri: product.imageUrl }}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>

                <View className="p-3">
                  <Text className="text-base font-semibold text-gray-800">
                    {product.name}
                  </Text>

                  <Text className="font-bold mt-1">₹{product.price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
