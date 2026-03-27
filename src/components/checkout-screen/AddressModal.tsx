import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAddressStore } from '../../store/useAddressStore';
import AddressRow from './AddressRow';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AddressModal({ visible, onClose }: Props) {
  const addresses = useAddressStore(state => state.addresses);
  const selectedAddressId = useAddressStore(state => state.selectedAddressId);
  const removeAddress = useAddressStore(state => state.removeAddress);
  const selectAddress = useAddressStore(state => state.selectAddress);

  const [query, setQuery] = useState('');

  const filteredAddresses = addresses.filter(
    a =>
      a.type.toLowerCase().includes(query.toLowerCase()) ||
      a.locality.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent={true}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <View className="bg-white rounded-t-3xl p-4 h-3/4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Address</Text>
            <Pressable onPress={onClose}>
              <Ionicons name="close" size={21} color="#374151" />
            </Pressable>
          </View>

          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2 mb-3">
            <Ionicons name="search" size={18} color="#9ca3af" />
            <TextInput
              onChangeText={setQuery}
              value={query}
              placeholder="Search Addresses"
              placeholderTextColor="#9ca3af"
              className="flex-1 ml-2 text-sm"
            />
          </View>

          <FlatList
            data={addresses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <AddressRow
                address={item}
                isSelected={item.id === selectedAddressId}
                onRemove={(id: string) => removeAddress(id)}
                onSelect={(id: string) => selectAddress(id)}
              />
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
