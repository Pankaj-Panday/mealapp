import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import CategoryScreen from '../../screens/CategoryScreen';
import { MainRoutes, MainStackParamList } from '../../types/routes';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import AddAddressScreen from '../../screens/AddAddressScreen';

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
      <Stack.Screen name={MainRoutes.Checkout} component={CheckoutScreen} />
      <Stack.Screen name={MainRoutes.Profile} component={ProfileScreen} />
      <Stack.Screen name={MainRoutes.AddAddress} component={AddAddressScreen} />
    </Stack.Navigator>
  );
}
