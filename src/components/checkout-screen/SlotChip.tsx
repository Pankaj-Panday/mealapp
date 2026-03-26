import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  label: string;
  selected: boolean;
  onPress?: () => void;
};

export default function SlotChip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`px-3 py-2 rounded-lg mr-2 border ${selected ? 'border-green-600' : 'border-gray-200'} ${selected ? 'bg-green-600' : 'bg-white'}`}
    >
      <Text
        className={`${selected ? 'text-white' : 'text-gray-800'} font-semibold`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
