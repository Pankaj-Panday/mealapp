import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormValues } from '../types/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthRoutes, AuthStackParamList } from '../types/routes';

type Props = NativeStackScreenProps<AuthStackParamList, AuthRoutes.Login>;

export default function LoginScreen({ navigation, route }: Props) {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <View className="flex-1 bg-white p-4 justify-center">
      <Text className="text-2xl font-bold text-center text-green-600">
        Get Started
      </Text>
      <Text className="text-center text-gray-600 mt-2">
        Enter your details to pick fresh food
      </Text>

      <Text className="text-sm font-medium mt-6">Email</Text>
      <Controller
        control={control}
        name="email"
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

      <Text className="text-sm font-medium mt-6">Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="*******"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            textContentType="password"
            placeholderTextColor={'#9ca3af'}
            className="border-b border-gray-300 py-2 text-black"
          />
        )}
      />

      <TouchableOpacity className="bg-green-600 p-3 rounded-full mt-6">
        <Text className="text-white text-center font-bold">CONTINUE</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white border border-gray-300 p-3 rounded-full mt-4 flex-row justify-center">
        <Image
          source={{
            uri: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
          }}
          className="w-5 h-5 mr-2"
        />
        <Text className="text-gray-800 font-bold">Continue with Google</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text>Don't have an account? </Text>
        <Pressable
          onPress={() => navigation.navigate(AuthRoutes.SignUp)}
          className="active:opacity-60"
        >
          <Text className="text-green-600 font-bold">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
