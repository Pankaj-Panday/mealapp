import { Image, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function SplashScreen() {
  return (
    <SafeAreaView className="flex-1 bg-green-700 justify-center items-center">
      {/* Logo */}
      <Image
        source={require('../../assets/logo.png')}
        className="w-48 h-48"
        resizeMode="contain"
      />

      {/* Brand name */}
      <View className="absolute bottom-16 items-center">
        <View className="flex-row items-center gap-2">
          <Ionicons name="leaf-outline" size={24} color="#ffffff" />
          <Text className="text-white text-2xl font-bold">FreshMeals</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
