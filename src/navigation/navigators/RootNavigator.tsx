import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootRoutes, RootStackParamList } from '../../types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = true;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name={RootRoutes.Main} component={MainNavigator} />
      ) : (
        <Stack.Screen name={RootRoutes.Auth} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
