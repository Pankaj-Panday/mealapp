import { Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function Footer() {
  return (
    <View className="mt-10 pb-8 items-center">
      <View className="flex-row items-center">
        <Ionicons name="leaf-outline" size={26} color="#7c3aed" />
        <Text className="text-2xl font-extrabold text-purple-600 ml-2">
          Fresh
        </Text>
        <Text className="text-2xl font-extrabold text-green-600 ml-1">to</Text>
        <Text className="text-2xl font-extrabold text-purple-600 ml-1">
          home
        </Text>
      </View>
    </View>
  );
}
