import { Pressable, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList, MainRoutes } from '../types/routes';
import { useAddressStore } from '../store/useAddressStore';
import { useState } from 'react';
import { AddressFormValues, AddressType } from '../types/address';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import { useForm } from 'react-hook-form';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.AddAddress>;

export default function AddAddressScreen({ navigation, route }: Props) {
  const addAddress = useAddressStore(state => state.addAddress);
  const [type, setType] = useState<AddressType>('Home');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locality, setLocality] = useState('');
  const [pincode, setPincode] = useState('');

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

  return (
    <SafeAreaView className="bg-white flex-1">
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
                label="Building"
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

        {/* Submit button */}
        <View className="mt-6">
          <Pressable
            className="bg-green-600 py-3 rounded-lg items-center"
            onPress={handleSubmit(() => {
              console.log('Form submitted');
            })}
          >
            <Text className="text-white font-semibold text-base">
              Save Address
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
