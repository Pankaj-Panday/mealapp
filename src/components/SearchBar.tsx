import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function SearchBar({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <View className="bg-white rounded-full h-12 flex-row items-center px-4 shadow">
      <FontAwesome name="search" size={16} color="#9ca3af" />
      <TextInput
        placeholder="Search Chicken"
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChange}
        className="ml-3 flex-1 text-base"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
