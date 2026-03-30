import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { Address } from '../../types/address';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function AddressRow({
  address,
  isSelected,
  onSelect,
  onRemove,
}: Props) {
  return (
    <Pressable
      onPress={() => onSelect(address.id)}
      className="bg-white rounded-lg p-4 mb-3 shadow"
    >
      <View className="flex-row">
        <View className="w-10 h-10 rounded-md bg-green-50 items-center justify-center mr-3">
          <Ionicons name="home-outline" size={20} color={'#16a34a'} />
        </View>

        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-700 text-base font-semibold">
              {address.type}
            </Text>
            <View className="flex-row items-center">
              <View
                className={`w-4 h-4 rounded-full ${isSelected ? 'bg-green-500' : 'border-gray-300 border'}`}
              />
            </View>
          </View>

          <View>
            <Text className="text-gray-700 mt-1 font-medium">
              {address.name} ({address.mobile})
            </Text>
            <Text className="text-gray-500 text-sm mt-1">{address.flatNo}</Text>
            <Text className="text-gray-500 text-sm">
              {[address.buildingName, address.street, address.landmark]
                .filter(Boolean)
                .join(', ')}
            </Text>
            <Text className="text-gray-500 text-sm">
              {address.locality} - {address.pincode}
            </Text>
          </View>

          <View className="flex-row mt-3">
            <Pressable className="mr-4">
              <Text className="font-semibold text-purple-600">Edit</Text>
            </Pressable>
            <Pressable onPress={() => onRemove(address.id)}>
              <Text className="font-semibold text-purple-600">Remove</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
