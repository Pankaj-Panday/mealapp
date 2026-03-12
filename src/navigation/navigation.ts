import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import React from 'react';
import { RootStackParamsList } from './routes';
import Logger from '../utils/logger';

export const NavigationRef =
  React.createRef<NavigationContainerRef<RootStackParamsList>>();

export function parseAndLogRoute(state: NavigationState | undefined) {
  if (!state) return;

  const { routes, index } = state;
  const currentRoute = routes[index];
  Logger.info('Current Route', {
    name: currentRoute.name,
    params: currentRoute?.params,
  });
}

export function setIsNavigationReady() {
  Logger.info('Navigation is ready');
}
