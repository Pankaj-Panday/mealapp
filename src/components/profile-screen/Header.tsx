import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { User } from '../../types/user';
import { maskPhone } from '../../utils/common';

type Props = {
  user: User | null;
  onLogoutBtnClick: () => void;
  isAuthenticated: boolean;
};

export default function Header({
  user,
  isAuthenticated,
  onLogoutBtnClick,
}: Props) {
  const maskedPhone = maskPhone(user?.phone);

  return (
    <View className="pt-4 pb-2">
      <Text className="text-2xl font-extrabold text-gray-900">
        {isAuthenticated ? `Hi, ${user?.email}` : 'Hi Guest'}
      </Text>

      {!isAuthenticated ? (
        <View className="flex-row items-center mt-1">
          <Text className="text-sm text-gray-500">Please</Text>
          <Pressable className="mx-1">
            <Text className="text-blue-600 font-semibold"> Login </Text>
          </Pressable>
          <Text className="text-sm text-gray-500">to enjoy your shopping</Text>
        </View>
      ) : (
        <View>
          <Text className="text-sm text-gray-600">{user?.email}</Text>
          <Text className="text-sm text-gray-600 mt-1">{maskedPhone}</Text>

          <Pressable onPress={onLogoutBtnClick} className="mt-2">
            <Text className="text-red-600 text-sm font-semibold">Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
