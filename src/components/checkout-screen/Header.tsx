import { Text, View } from 'react-native';
import React, { useState } from 'react';
import SlotSection from './SlotSection';
import AddressSection from './AddressSection';
import PaymentMethodSelect from './PaymentMethodSelect';
import { Address } from '../../types/address';
import { PaymentMethod } from '../../types/common';

type Props = {
  onAddressChangeBtnClick: () => void;
  selectedAddress: Address;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

export default function Header({
  onAddressChangeBtnClick,
  selectedAddress,
  paymentMethod,
  onPaymentMethodChange,
}: Props) {
  const [notes, setNotes] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('ASAP');

  const slotOptions = [
    'ASAP',
    'Today 6-8 PM',
    'Tomorrow 9-11 AM',
    'Tomorrow 6-8 PM',
    'Tomorrow 9-11 PM',
  ];

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
        onPaymentMethodChange={onPaymentMethodChange}
      />
      <Text className="text-gray-700 font-semibold mt-6 mb-3">
        Order Summary
      </Text>
    </View>
  );
}
