import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Category } from '../types/category';

type Props = {
  category: Category;
  onPress?: () => void;
};

export default function CategoryCard({ category, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-[#f3e8ff] w-28 h-32 rounded-2xl items-center justify-start py-3 px-2 shadow">
        <Image
          source={{ uri: category.imageUrl }}
          resizeMode="cover"
          className="w-14 h-14 rounded-full"
        />

        <Text
          numberOfLines={2}
          className="text-center text-xs font-semibold mt-2"
        >
          {category.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
