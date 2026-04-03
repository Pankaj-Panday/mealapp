import { Alert, FlatList, View } from 'react-native';
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
import { useAddressStore } from '../store/useAddressStore';
import Logger from '../utils/logger';
import { PaymentMethod } from '../types/common';
import { createOrder, createRazorPayOrder } from '../api/order';
import { RazorPayOrder } from '../types/order';
import { useAuthStore } from '../store/useAuthStore';
import { RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout, { CheckoutOptions } from 'react-native-razorpay';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Checkout>;

export default function CheckoutScreen({ navigation, route }: Props) {
  const items = useCartStore(state => state.items);
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const totalItems = useCartStore(state => state.getTotalItems());
  const selectedAddressId = useAddressStore(state => state.selectedAddressId);
  const addresses = useAddressStore(state => state.addresses);
  const clearCart = useCartStore(state => state.clearCart);
  const user = useAuthStore(state => state.user);

  const [isProcessing, setIsProcessing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE');

  const selectedAddress =
    addresses.find(a => a.id === selectedAddressId) ?? addresses[0];

  const handlePayment = async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select an address');
      return;
    }
    if (items.length === 0) {
      Alert.alert('Error', 'Please add items to the cart');
      return;
    }
    setIsProcessing(true);
    try {
      if (paymentMethod === 'COD') {
        const orderData = {
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
          })),
          totalAmount: totalPrice,
          paymentMethod: 'COD',
          address: selectedAddress,
        };
        const order = await createOrder(orderData);
        clearCart();
        navigation.navigate(MainRoutes.OrderConfirmation, { order });
      } else {
        // handle online payment
        const orderData: RazorPayOrder = {
          amount: totalPrice * 100, // razorpay expects amount in paise
          currency: 'INR',
          receipt: `order_receipt_${Date.now()}`,
        };
        const { data: razorpayOrder } = await createRazorPayOrder(orderData);

        const cleanedContact = (user?.phone || '9999999999  ')
          ?.replace(/\D/g, '')
          .slice(-10);

        const options: CheckoutOptions = {
          key: RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'FreshMeals',
          description: 'Order Payment',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg',
          order_id: razorpayOrder.id,
          prefill: {
            name: user?.name || 'Demo User',
            email: user?.email || 'demo@example.com',
            contact: cleanedContact,
          },
          theme: {
            color: '#16a34a',
          },
          retry: {
            enabled: true,
            max_count: 2,
          },
        };

        const data = await RazorpayCheckout.open(options);

        if (data.razorpay_payment_id) {
          const fullOrderData = {
            items: items.map(item => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              name: item.name,
            })),
            totalAmount: totalPrice,
            paymentMethod: 'ONLINE',
            address: selectedAddress,
            paymentId: data.razorpay_payment_id,
            razorpayOrderId: data.razorpay_order_id,
          };
          const order = await createOrder(fullOrderData);
          clearCart();
          navigation.navigate(MainRoutes.OrderConfirmation, { order });
        }
      }
    } catch (error) {
      Logger.error('Payment error', error);
      Alert.alert('Error', 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 px-4">
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            ListHeaderComponent={
              <Header
                paymentMethod={paymentMethod}
                onPaymentMethodChange={(method: PaymentMethod) =>
                  setPaymentMethod(method)
                }
                selectedAddress={selectedAddress}
                onAddressChangeBtnClick={() => setModalVisible(true)}
              />
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
          onPress={handlePayment}
        />
      </SafeAreaView>
    </>
  );
}
