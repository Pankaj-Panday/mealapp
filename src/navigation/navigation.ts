import {
  NavigationContainerRef,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import React from 'react';
import Logger from '../utils/logger';
import { RootStackParamList } from '../types/routes';

export const NavigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

function getActiveRoute(
  state: NavigationState | PartialState<NavigationState>,
): any {
  const route = state.routes[state.index ?? 0];

  if (route.state) {
    return getActiveRoute(route.state);
  }

  return route;
}

export function parseAndLogRoute(state: NavigationState | undefined) {
  if (!state) return;

  const route = getActiveRoute(state);

  Logger.info('Current Route', {
    name: route.name,
    params: route.params,
  });
}

export function setIsNavigationReady() {
  Logger.info('Navigation is ready');
}
