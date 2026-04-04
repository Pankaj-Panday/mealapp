import { Text, View } from 'react-native';
import React from 'react';
import { OrderData } from '../../types/order';
import { cn } from '../../utils/cn';
import { format } from 'date-fns';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  order: OrderData;
};

export default function OrderCard({ order }: Props) {
  const statusChipClasses = (status: string) => {
    const key = status.toLowerCase();

    if (key.includes('delivered') || key.includes('completed')) {
      return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
    }

    if (key.includes('cancel')) {
      return 'bg-rose-50 text-rose-700 border border-rose-100';
    }

    if (key.includes('pending') || key.includes('processing')) {
      return 'bg-amber-50 text-amber-700 border border-amber-100';
    }

    if (key.includes('shipped') || key.includes('out')) {
      return 'bg-blue-50 text-blue-700 border border-blue-100';
    }

    return 'bg-zinc-100 text-zinc-700 border border-zinc-200';
  };

  const itemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View className="shadow-sm mx-4 my-2 rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      <View className="p-4 pb-3">
        <View className="items-center justify-between flex-row">
          <Text className="text-base font-semibold text-gray-800">
            Order #{order.id.slice(0, 8)}
          </Text>
          <View
            className={cn(
              'px-2.5 py-1 rounded-full',
              statusChipClasses(order.status),
            )}
          >
            <Text className="text-[11px] uppercase font-semibold">
              {order.status}
            </Text>
          </View>
        </View>

        <View className="mt-2 flex-row items-center">
          <Text className="text-xs text-zinc-500">
            📅 {format(new Date(order.createdAt), 'dd MMM yyyy')}
          </Text>

          <Text className="mx-2 text-zinc-300">•</Text>

          <Text className="text-xs text-zinc-500">
            💳 {order.paymentMethod}
          </Text>

          <Text className="mx-2 text-zinc-300">•</Text>

          <Text className="text-xs text-zinc-500">
            🛒 {itemsCount} item{itemsCount === 1 ? '' : 's'}
          </Text>
        </View>

        <View className="mt-3 h-[1px] bg-zinc-100" />

        <View className="px-4 pt-3">
          <Text className="text-xs font-semibold text-slate-700 mb-1.5">
            Items
          </Text>
          {order.items.map(item => (
            <View
              key={item.productId}
              className="flex-row items-center justify-between py-1"
            >
              <Text className="text-xs text-zinc-600">
                {item.quantity} x{' '}
                <Text className="font-medium">
                  {item.name} (Product: {item.productId})
                </Text>
              </Text>
              <Text className="text-xs font-semibold text-slate-600">
                {item.price.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View className="px-4 mt-3 mb-4">
          <Text className="text-xs font-semibold text-slate-700 mb-1">
            Delivery Address
          </Text>

          <Text className="text-xs text-zinc-600">
            {order.address.name} • {order.address.mobile}
          </Text>

          <Text className="text-xs text-zinc-600">
            {[
              order.address.flatNo,
              order.address.buildingName,
              order.address.street,
              order.address.landmark,
              order.address.locality,
            ]
              .filter(Boolean)
              .join(', ')}{' '}
            • {order.address.pincode}
          </Text>
        </View>
      </View>

      <View className="border-t border-zinc-200 bg-violet-50 px-4 py-2.5 flex-row items-center justify-between">
        <Text className="text-xs font-bold text-violet-700">
          🚚{'  '}Track & Support
        </Text>

        <Ionicons name="chevron-forward" size={16} color="#6d28d9" />
      </View>
    </View>
  );
}
