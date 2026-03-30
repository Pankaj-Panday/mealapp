import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthRoutes, AuthStackParamList } from '../types/routes';
import { Controller, useForm } from 'react-hook-form';
import { SignupFormValues } from '../types/auth';
import { signUp } from '../api/auth';
import Logger from '../utils/logger';
import { useAuthStore } from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoutes.SignUp>;

export default function SignUpScreen({ navigation, route }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      phone: '',
      email: '',
      password: '',
    },
  });

  const checkStorage = async () => {
    const data = await AsyncStorage.getItem('auth-storage');
    console.log('AsyncStorage auth-storage:', data);
  };

  const setAuth = useAuthStore(state => state.setAuth);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const { data: user, token } = await signUp(data);
      Logger.info('SignUpScreen: User signed up successfully', { user, token });
      setAuth(user, token);
      checkStorage();
    } catch (error: any) {
      Logger.error('SignUpScreen: Error signing up', error);
      Alert.alert('Error', error?.response?.data?.error || 'Failed to sign up');
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <Text className="text-2xl font-bold text-center text-green-600">
        Get Started
      </Text>

      <Text className="text-sm font-medium mt-6">Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="youremail@example.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#9ca3af'}
            autoCapitalize="none"
            keyboardType="email-address"
            className="border-b border-gray-300 py-2"
          />
        )}
      />
      {errors?.email && (
        <Text className="text-red-500 mt-2">{errors?.email?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="*******"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#9ca3af'}
            secureTextEntry={true}
            textContentType="password"
            className="border-b border-gray-300 py-2 text-black"
          />
        )}
      />
      {errors?.password && (
        <Text className="text-red-500 mt-2">{errors?.password?.message}</Text>
      )}

      <Text className="text-sm font-medium mt-6">Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        rules={{
          required: 'Phone Number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone Number must be 10 digits',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="1234567890"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={'#9ca3af'}
            keyboardType="phone-pad"
            className="border-b border-gray-300 py-2"
          />
        )}
      />
      {errors?.phone && (
        <Text className="text-red-500 mt-2">{errors?.phone?.message}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="bg-green-600 p-3 rounded-full mt-6"
      >
        <Text className="text-white text-center font-bold">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text>Already have an account? </Text>
        <Pressable
          onPress={() => navigation.goBack()}
          className="active:opacity-60"
        >
          <Text className="text-green-600 font-bold">Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
