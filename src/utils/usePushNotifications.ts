import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainerRef} from '@react-navigation/native';

export const usePushNotifications = (
  navigationRef: React.RefObject<NavigationContainerRef>,
  ready: boolean,
) => {
  const [screen, setScreen] = useState('');
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage.data?.screenName) {
        navigationRef?.current?.navigate(remoteMessage.data.screenName);
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data?.screenName) {
          setScreen(remoteMessage.data.screenName);
        }
      });
  }, []);
  useEffect(() => {
    if (screen) {
      navigationRef?.current?.navigate(screen);
    }
  }, [ready]);
};
