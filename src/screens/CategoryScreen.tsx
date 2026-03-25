import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProductsByCategory } from '../api/categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import ProductCard from '../components/ProductCard';
import CartBottombar from '../components/CartBottombar';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Category>;

export default function CategoryScreen({ navigation, route }: Props) {
  const { categoryId } = route.params;

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.data || [];
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products', selectedCategoryId],
    queryFn: () => fetchProductsByCategory(selectedCategoryId),
    enabled: !!selectedCategoryId,
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
              <Text>{selectedCategory?.name}</Text>
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

      <CartBottombar />

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center bg-black/40 px-6">
          <View className="bg-white rounded-3xl max-h-[70%] p-5">
            {/* Header */}
            <Text className="text-xl font-bold mb-4 text-gray-800">
              Categories
            </Text>

            {/* Category List */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {categories.map(category => {
                const isSelected = selectedCategoryId === category.id;

                return (
                  <Pressable
                    key={category.id}
                    onPress={() => {
                      setSelectedCategoryId(category.id);
                      setModalVisible(false);
                    }}
                    className="flex-row items-center justify-between px-4 py-3 mb-2 rounded-xl border"
                    style={{
                      backgroundColor: isSelected ? '#ECFDF5' : '#F9FAFB',
                      borderColor: isSelected ? '#10B981' : '#E5E7EB',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: isSelected ? '600' : '400',
                        color: '#1F2937',
                      }}
                    >
                      {category.name}
                    </Text>

                    {/* Selection indicator */}
                    <View
                      className="h-5 w-5 rounded-full border items-center justify-center"
                      style={{
                        borderColor: isSelected ? '#10B981' : '#9CA3AF',
                      }}
                    >
                      {isSelected && (
                        <View
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: '#10B981' }}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Close Button */}
            <Pressable
              onPress={() => setModalVisible(false)}
              className="py-3 rounded-xl mt-4"
              style={{
                backgroundColor: '#EF4444',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
