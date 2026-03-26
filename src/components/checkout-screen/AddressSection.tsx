import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Address } from '../../types/address';

type Props = {
  address: Address;
};

export default function AddressSection({ address }: Props) {
  return (
    <View>
      <Text className="text-gray-700 font-semibold mt-6 mb-3">Deliver to</Text>
      <View className="bg-white rounded-2xl p-4 shadow">
        <View className="flex-row gap-3 items-start">
          <View className="bg-green-50 w-12 h-12 rounded-md justify-center items-center">
            <Ionicons name="home-outline" size={22} color={'#16a34a'} />
          </View>

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-base font-bold">{address.type}</Text>
                <Text className="text-gray-700 font-medium mt-1">
                  {address.name}
                </Text>
              </View>

              <Pressable className="px-2 py-1">
                <Text className="text-purple-600 font-semibold">Change</Text>
              </Pressable>
            </View>

            <Text className="text-gray-500 mt-2">
              {[address.flatNo, address.buildingName]
                .filter(Boolean)
                .join(', ')}
            </Text>

            <Text className="text-gray-500">
              {[address.street, address.landmark].filter(Boolean).join(', ')}
            </Text>

            <Text className="text-gray-500">
              {[address.locality, address.pincode].filter(Boolean).join(' - ')}
            </Text>

            <View className="flex-row items-center gap-2 mt-3">
              <Ionicons name="star" size={14} color={'#f59e0b'} />
              <Text className="text-sm text-gray-500">
                Preferred delivery address
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
