import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

export default function CategorySkeletonRow() {
  const placeholders = Array.from({ length: 8 }, (_, index) => index);

  return (
    <View className="mt-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {placeholders.map(index => (
          <View key={index} className="mr-4">
            <View className="bg-zinc-100 w-28 h-32 rounded-2xl items-center justify-start py-3 px-2">
              <View className="w-14 h-14 rounded-full bg-zinc-300 animate-pulse" />

              <View className="mt-2 space-y-1 items-center">
                <View className="w-16 h-3 rounded bg-zinc-300 animate-pulse" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
