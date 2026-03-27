import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useCartStore } from '../store/useCartStore';
import CheckoutFooter from '../components/checkout-screen/CheckoutBottomBar';
import Summary from '../components/checkout-screen/Summary';
import Header from '../components/checkout-screen/Header';
import CheckoutItemCard from '../components/checkout-screen/CheckoutItemCard';
import AddressModal from '../components/checkout-screen/AddressModal';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Checkout>;

export default function CheckoutScreen({ navigation, route }: Props) {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const totalItems = useCartStore(state => state.getTotalItems());

  const [isProcessing, setIsProcessing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 px-4">
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <Header onAddressChangeBtnClick={() => setModalVisible(true)} />
            }
            ListFooterComponent={
              <View className="mt-4">
                <Summary
                  subtotal={`₹${totalPrice.toFixed(2)}`}
                  deliveryFee="Free"
                  total={`₹${totalPrice.toFixed(2)}`}
                />
              </View>
            }
            renderItem={({ item }) => {
              return <CheckoutItemCard item={item} />;
            }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        </View>

        <AddressModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <CheckoutFooter
          totalItems={totalItems}
          totalPrice={totalPrice}
          isProcessing={isProcessing}
          onPress={() => {}}
        />
      </SafeAreaView>
    </>
  );
}
