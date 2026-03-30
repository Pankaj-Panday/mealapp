import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, MainRoutes } from '../types/routes';
import { useAddressStore } from '../store/useAddressStore';
import { useState } from 'react';
import { AddressFormValues, AddressType } from '../types/address';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import { useForm } from 'react-hook-form';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { cn } from '../utils/cn';
import AddressTypeButton from '../components/add-address-screen/AddressTypeButton';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.AddAddress>;

export default function AddAddressScreen({ navigation, route }: Props) {
  const addAddress = useAddressStore(state => state.addAddress);
  const addressTypes: AddressType[] = ['Home', 'Work', 'Other'];
  const insets = useSafeAreaInsets();

  const [type, setType] = useState<AddressType>('Home');

  const { handleSubmit, control } = useForm<AddressFormValues>({
    defaultValues: {
      name: '',
      mobile: '',
      flatNo: '',
      buildingName: '',
      street: '',
      landmark: '',
      locality: '',
      pincode: '',
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    console.log(data, type);
    addAddress({
      ...data,
      type,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView className="bg-white flex-1 border">
      <ScrollView className="p-4">
        <Text className="text-lg font-bold mb-6">New Address</Text>

        <View className="gap-3">
          <FormInput
            label="Name"
            name="name"
            control={control}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            }}
            placeholder="Enter your name"
            icon={<FontAwesome name="user" size={18} color="#6b7280" />}
          />

          <FormInput
            label="Mobile"
            name="mobile"
            control={control}
            keyboardType="phone-pad"
            placeholder="Enter your mobile"
            icon={<FontAwesome name="mobile" size={18} color="#6b7280" />}
          />

          {/* Flat + Building */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormInput
                label="Flat / House No"
                name="flatNo"
                control={control}
                placeholder="Flat No"
                icon={<FontAwesome name="home" size={16} color="#6b7280" />}
              />
            </View>

            <View className="flex-1">
              <FormInput
                label="Building (Optional)"
                name="buildingName"
                control={control}
                placeholder="Building name"
                icon={<FontAwesome name="building" size={16} color="#6b7280" />}
              />
            </View>
          </View>

          <FormInput
            label="Street"
            name="street"
            control={control}
            placeholder="Street / Road"
            icon={<FontAwesome name="road" size={16} color="#6b7280" />}
          />

          <FormInput
            label="Landmark"
            name="landmark"
            control={control}
            placeholder="Nearby landmark"
            icon={<FontAwesome name="map-marker" size={16} color="#6b7280" />}
          />

          {/* Locality + Pincode */}
          <View className="flex-row gap-4">
            <View className="flex-1">
              <FormInput
                label="Locality"
                name="locality"
                control={control}
                placeholder="Area / locality"
                icon={<FontAwesome name="map" size={16} color="#6b7280" />}
              />
            </View>

            <View className="flex-1">
              <FormInput
                label="Pincode"
                name="pincode"
                control={control}
                keyboardType="number-pad"
                placeholder="Pincode"
                icon={
                  <FontAwesome
                    name="location-arrow"
                    size={16}
                    color="#6b7280"
                  />
                }
              />
            </View>
          </View>
        </View>

        <Text className="text-sm text-gray-500 mb-2 mt-4">SAVE AS</Text>
        <View className="flex-row mb-6 gap-3">
          {addressTypes.map(item => (
            <AddressTypeButton
              key={item}
              label={item}
              selected={type === item}
              onPress={() => setType(item)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Submit button */}
      <View
        className="absolute left-0 right-0 py-3 px-4 bg-white border-t border-gray-200"
        style={{ bottom: insets.bottom }}
      >
        <Pressable
          className="bg-green-600 py-3 rounded-lg items-center"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-semibold text-base">
            Save Address
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
