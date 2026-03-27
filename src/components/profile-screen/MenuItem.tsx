import { Pressable, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { MenuItem as MenuItemType } from '../../types/common';

type Props = {
  menuItem: Extract<MenuItemType, { type: 'item' }>;
};

export default function MenuItem({ menuItem }: Props) {
  return (
    <Pressable className="flex-row items-center py-3">
      <View className="w-11 h-11 rounded-lg bg-gray-100 items-center justify-center mr-3">
        <Ionicons name={menuItem.icon} size={18} color="#4b5563" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">
          {menuItem.title}
        </Text>
        {menuItem.subtitle && (
          <Text className="text-sm text-gray-500 mt-1">
            {menuItem.subtitle}
          </Text>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
    </Pressable>
  );
}
