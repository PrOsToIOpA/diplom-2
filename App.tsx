import React, {useState} from 'react';

import * as Sentry from '@sentry/react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/reducers';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/utils/navigation';
import analytics from '@react-native-firebase/analytics';
import MainNavigation from './src/navigation';
import {usePushNotifications} from './src/utils/usePushNotifications';
import {deepLink} from './src/utils/deepLink';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// Sentry.init({
//   dsn: 'https://fe65049f1a954c0e820878111fdc0f08@o942178.ingest.sentry.io/5998762',
//   debug: true,
// });
const App = () => {
  const [ready, setReady] = useState<boolean>(false);
  usePushNotifications(navigationRef, ready);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer
          onReady={() => {
            setReady(true);
          }}
          linking={deepLink}
          ref={navigationRef}
          onStateChange={async state => {
            const currentRouteName =
              navigationRef?.current?.getCurrentRoute()?.name;
            if (state?.routes && state?.routes.length > 1) {
              if (
                state?.routes[state?.routes.length - 2].name !==
                currentRouteName
              ) {
                await analytics().logScreenView({
                  screen_name: currentRouteName,
                  screen_class: currentRouteName,
                });
              }
            }
          }}
        >
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
