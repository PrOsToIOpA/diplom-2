import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {white} from '../utils/constants/colors';
import WebView from 'react-native-webview';
import {deviceWidth} from '../utils/dimensions';
import CommonView from '../components/Views/CommonView';
import {useSelector} from 'react-redux';
import {IRootReducer} from '../store/reducers';

export const RaboomScreen = () => {
  const token = useSelector<IRootReducer>(
    state => state.authReducer.access_token,
  );

  const jsCode: string = `window.localStorage.setItem('token', '${token}')`;
  return (
    <CommonView style={styles.main}>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <WebView
        injectedJavaScriptBeforeContentLoaded={jsCode}
        source={{uri: 'https://raboom.nl/account'}}
        style={{flex: 1, width: deviceWidth}}
      />
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
