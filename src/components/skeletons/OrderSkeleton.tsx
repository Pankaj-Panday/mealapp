import { Text, View } from 'react-native';
import React from 'react';

export default function OrderSkeleton() {
  return (
    <View className="mx-4 my-2 rounded-2xl border border-zinc-200 bg-white overflow-hidden">
      <View className="p-4 pb-3 animate-pulse">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="h-4 w-32 bg-zinc-200 rounded" />
          <View className="h-5 w-16 bg-zinc-200 rounded-full" />
        </View>

        {/* Meta row */}
        <View className="mt-3 flex-row items-center">
          <View className="h-3 w-20 bg-zinc-200 rounded" />
          <View className="mx-2 h-3 w-3 bg-zinc-200 rounded-full" />
          <View className="h-3 w-16 bg-zinc-200 rounded" />
          <View className="mx-2 h-3 w-3 bg-zinc-200 rounded-full" />
          <View className="h-3 w-20 bg-zinc-200 rounded" />
        </View>

        {/* Divider */}
        <View className="mt-3 h-[1px] bg-zinc-200" />

        {/* Items section */}
        <View className="px-4 pt-3">
          <View className="h-3 w-16 bg-zinc-200 rounded mb-2" />

          <View className="flex-row justify-between py-1">
            <View className="h-3 w-40 bg-zinc-200 rounded" />
            <View className="h-3 w-10 bg-zinc-200 rounded" />
          </View>

          <View className="flex-row justify-between py-1">
            <View className="h-3 w-32 bg-zinc-200 rounded" />
            <View className="h-3 w-10 bg-zinc-200 rounded" />
          </View>
        </View>

        {/* Address */}
        <View className="px-4 mt-3 mb-4">
          <View className="h-3 w-28 bg-zinc-200 rounded mb-2" />
          <View className="h-3 w-36 bg-zinc-200 rounded mb-1" />
          <View className="h-3 w-56 bg-zinc-200 rounded" />
        </View>
      </View>

      {/* Footer */}
      <View className="border-t border-zinc-200 bg-violet-50 px-4 py-3 flex-row items-center justify-between">
        <View className="h-3 w-28 bg-zinc-200 rounded animate-pulse" />
        <View className="h-3 w-3 bg-zinc-200 rounded animate-pulse" />
      </View>
    </View>
  );
}
