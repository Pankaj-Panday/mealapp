import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootRoutes, RootStackParamList } from '../../types/routes';
import { useAuthStore } from '../../store/useAuthStore';
import SplashScreen from '../../screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const hasHydrated = useAuthStore(state => state.hasHydrated);

  if (!hasHydrated) {
    return <SplashScreen />;
  }

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
