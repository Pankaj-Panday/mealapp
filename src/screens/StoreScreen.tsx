import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Store>;

export default function StoreScreen({ navigation, route }: Props) {
  return (
    <View>
      <Text>StoreScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
