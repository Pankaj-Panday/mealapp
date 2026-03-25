import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { RootRoutes, RootStackParamList } from '../../types/routes';
import { useAuthStore } from '../../store/useAuthStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const token = useAuthStore(state => state.token);
  const [isLoding, setIsLoading] = useState(true);

  useAuthStore.persist.onFinishHydration(() => {
    console.log('Auth state hydration finished', { isAuthenticated, token });
    setIsLoading(false);
  });

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
