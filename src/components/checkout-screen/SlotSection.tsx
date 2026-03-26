import { ScrollView, Text, TextInput, View } from 'react-native';
import React from 'react';
import SlotChip from './SlotChip';

type Props = {
  slotOptions: string[];
  selectedSlot: string;
  onSlotChange: (slot: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
};

export default function SlotSection({
  slotOptions,
  selectedSlot,
  onSlotChange,
  notes,
  onNotesChange,
}: Props) {
  return (
    <View>
      <Text className="text-gray-700 font-semibold mt-6 mb-3">
        Delivery Slot
      </Text>
      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="text-gray-500 text-sm mb-3">
          Choose when you'd like your order
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {slotOptions.map(option => (
            <SlotChip
              key={option}
              label={option}
              selected={selectedSlot == option}
              onPress={() => onSlotChange(option)}
            />
          ))}
        </ScrollView>

        <View className="mt-4">
          <Text className="text-gray-500 text-sm mb-2">
            Add note for delivery (optional)
          </Text>
          <TextInput
            value={notes}
            onChangeText={onNotesChange}
            placeholder="e.g. Call before delivery"
            placeholderTextColor={'#9ca3af'}
            className="bg-gray-100 rounded-lg px-3 py-2 text-sm"
          />
        </View>
      </View>
    </View>
  );
}
