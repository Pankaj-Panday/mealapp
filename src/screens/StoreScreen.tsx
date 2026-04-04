import {
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import { fetchMyOrders } from '../api/order';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  MainRoutes,
  MainStackParamList,
  MainTabParamList,
} from '../types/routes';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import OrderSkeleton from '../components/skeletons/OrderSkeleton';
import OrderCard from '../components/store-screen/OrderCard';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, MainRoutes.Home>,
  NativeStackScreenProps<MainStackParamList>
>;

export default function StoreScreen({ navigation, route }: Props) {
  const { user } = useAuthStore();
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: fetchMyOrders,
  });

  const orders = data?.data || [];

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar barStyle={'dark-content'} />
      <View className="px-4 pt-2 pb-3">
        <Text className="text-xl font-extrabold text-slate-900">My Orders</Text>
        <Text className="mt-0.5 text-xs text-zinc-500">
          View your recent orders and their status
        </Text>
      </View>

      {isLoading ? (
        <View>
          <OrderSkeleton />
          <OrderSkeleton />
          <OrderSkeleton />
        </View>
      ) : orders.length === 0 ? (
        <View className="flex-1 px-6 items-center justify-center">
          <FontAwesome name="shopping-cart" size={48} color="#64748b" />

          <Text className="text-base font-semibold text-slate-800">
            No orders yet
          </Text>

          <Text className="mt-1 text-xs text-zinc-500 text-center">
            You haven't placed any orders. When you do, they'll show up here.
          </Text>

          <Pressable className="mt-4 px-4 py-2 rounded-full bg-slate-900">
            <Text className="text-white text-sm font-semibold">
              Start Shopping
            </Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <OrderCard order={item} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={!!isRefetching}
                onRefresh={onRefresh}
              />
            }
            ListFooterComponent={<View className="h-6" />}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
