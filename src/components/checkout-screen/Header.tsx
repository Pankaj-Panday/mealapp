import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { useAddressStore } from '../../store/useAddressStore';
import SlotSection from './SlotSection';
import AddressSection from './AddressSection';
import PaymentMethodSelect from './PaymentMethodSelect';
import { PaymentMethod } from '../../types/common';

type Props = {
  onAddressChangeBtnClick: () => void;
};

export default function Header({ onAddressChangeBtnClick }: Props) {
  const addresses = useAddressStore(state => state.addresses);
  const selectedAddressId = useAddressStore(state => state.selectedAddressId);
  const [notes, setNotes] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('ASAP');

  const slotOptions = [
    'ASAP',
    'Today 6-8 PM',
    'Tomorrow 9-11 AM',
    'Tomorrow 6-8 PM',
    'Tomorrow 9-11 PM',
  ];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE');
  const selectedAddress =
    addresses.find(a => a.id === selectedAddressId) ?? addresses[0];
  return (
    <View>
      <AddressSection
        address={selectedAddress}
        onAddressChangeBtnClick={onAddressChangeBtnClick}
      />
      <SlotSection
        slotOptions={slotOptions}
        selectedSlot={deliverySlot}
        onSlotChange={setDeliverySlot}
        notes={notes}
        onNotesChange={setNotes}
      />
      <PaymentMethodSelect
        paymentMethod={paymentMethod}
        onPaymentMethodChange={(method: PaymentMethod) =>
          setPaymentMethod(method)
        }
      />
      <Text className="text-gray-700 font-semibold mt-6 mb-3">
        Order Summary
      </Text>
    </View>
  );
}
