import * as React from 'react';
import * as navigationPackage from '@react-navigation/native';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigateRef(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function resetRef(name: string) {
  navigationRef.current?.reset({
    index: 1,
    routes: [{name}],
  });
}

export const useNavigation = () => {
  const nav = navigationPackage.useNavigation();
  return {
    ...nav,
  };
};
