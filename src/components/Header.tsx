import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamsList } from '../navigation/routes';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function Header() {
  const nav = useNavigation<NativeStackNavigationProp<MainStackParamsList>>();
  return (
    <View className="px-4 pb-4 rounded-b-2xl">
      <Text className="text-white text-sm">Delivery Starting in</Text>

      <View className="flex-row justify-between items-end mt-1">
        <View>
          <Text className="text-white text-3xl font-extrabold">
            15 minutes ⚡
          </Text>

          <View className="flex-row mt-1 items-center">
            <Text className="text-white font-medium">560024 - Darashalli</Text>
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color="white"
              style={{ marginLeft: 6 }}
            />
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Pressable>
            <Ionicons name="heart-outline" size={22} color="white" />
          </Pressable>

          <Pressable>
            <Ionicons name="person-outline" size={22} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
