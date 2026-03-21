import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import StoreScreen from '../../screens/StoreScreen';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { MainRoutes, MainTabParamList } from '../../types/routes';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1e88e5',
      }}
    >
      <Tab.Screen
        name={MainRoutes.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={MainRoutes.Store}
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="shopping-cart" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
