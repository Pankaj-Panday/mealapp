import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import CategoryScreen from '../../screens/CategoryScreen';
import { MainRoutes, MainStackParamList } from '../../types/routes';
import CartScreen from '../../screens/CartScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Tabs'} component={MainTabNavigator} />
      <Stack.Screen name={MainRoutes.Category} component={CategoryScreen} />
      <Stack.Screen name={MainRoutes.Cart} component={CartScreen} />
    </Stack.Navigator>
  );
}
