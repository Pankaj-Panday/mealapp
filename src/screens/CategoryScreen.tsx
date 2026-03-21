import { FlatList, Pressable, StatusBar, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProductsByCategory } from '../api/categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProductCard from '../components/ProductCard';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Category>;

export default function CategoryScreen({ navigation, route }: Props) {
  const { categoryId, categoryName } = route.params;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.data || [];
  const [selectedCategoryName, setSelectedCategoryName] = useState(
    categoryName || categories[0]?.name,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
    enabled: !!categoryId,
  });

  const products = productsData?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <View className="px-4 pt-3 pb-2 bg-white">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center justify-between">
            <Pressable onPress={() => navigation.goBack()} className="p-2">
              <Ionicons name="arrow-back" size={22} color="black" />
            </Pressable>

            <Pressable
              onPress={() => setModalVisible(true)}
              className="flex-row items-center gap-1 ml-3"
            >
              <Text>{selectedCategoryName}</Text>
              <Ionicons name="chevron-down" size={18} color="black" />
            </Pressable>
          </View>

          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="search-outline" size={22} color="black" />
          </Pressable>
        </View>
      </View>

      <View className="flex-1 px-4 mt-4">
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
          contentContainerStyle={{
            paddingBottom: products.length > 0 ? 80 : 0,
          }}
          ListEmptyComponent={
            <View className="text-gray-500 text-center">
              <Text>No products in this category.</Text>
            </View>
          }
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </View>
    </SafeAreaView>
  );
}
