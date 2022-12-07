import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabs} from '../BottomTabs';

import SigningScreen from '../../screens/SigningScreen';

import LocationRequestScreen from '../../screens/LocationRequestScreen';
import NotificationRequestScreen from '../../screens/NotificationRequestScreen';
import OfferRequestScreen from '../../screens/OfferRequestScreen';
import MoneyRequestScreen from '../../screens/MoneyRequestScreen';
import SliderRequestScreen from '../../screens/SliderRequestScreen';

import CashbackScreen from '../../screens/CashbackScreen';

import NameInputScreen from '../../screens/NameInputScreen';
import EmailInputScreen from '../../screens/EmailInputScreen';
import PasswordInputScreen from '../../screens/PasswordInputScreen';
import IdInputScreen from '../../screens/IdInputScreen';
import PopOverScreen from '../../screens/PopOverScreenAlpha';

import LoginScreen from '../../screens/LoginScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import LanguageChooseScreen from '../../screens/LanguageChooseScreen';
import SalesScreen from '../../screens/SalesScreen';
import LikesScreen from '../../screens/LikesScreen';
import BirthDate from '../../screens/DateOfBirthScreen';

const Stack = createStackNavigator();

const SigningStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SigningScreen'}
      headerMode="none"
      mode="card"
    >
      <Stack.Screen name={'SigningScreen'} component={SigningScreen} />

      <Stack.Screen name={'NameInputScreen'} component={NameInputScreen} />
      <Stack.Screen name={'EmailInputScreen'} component={EmailInputScreen} />
      <Stack.Screen
        name={'PasswordInputScreen'}
        component={PasswordInputScreen}
      />
      <Stack.Screen name={'IdInputScreen'} component={IdInputScreen} />
      <Stack.Screen name={'PopOverScreen'} component={PopOverScreen} />

      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen
        name={'ForgotPasswordScreen'}
        component={ForgotPasswordScreen}
      />

      <Stack.Screen name={'BottomTabs'} component={BottomTabs} />

      <Stack.Screen
        name={'LocationRequestScreen'}
        component={LocationRequestScreen}
      />
      <Stack.Screen
        name={'NotificationRequestScreen'}
        component={NotificationRequestScreen}
      />
      <Stack.Screen
        name={'OfferRequestScreen'}
        component={OfferRequestScreen}
      />

      <Stack.Screen
        name={'MoneyRequestScreen'}
        component={MoneyRequestScreen}
      />
      <Stack.Screen
        name={'SliderRequestScreen'}
        component={SliderRequestScreen}
      />
      <Stack.Screen
        name={'LanguageChooseScreen'}
        component={LanguageChooseScreen}
      />
      <Stack.Screen name={'BirthDate'} component={BirthDate} />
      <Stack.Screen name={'CashbackScreen'} component={CashbackScreen} />
    </Stack.Navigator>
  );
};

export const SalesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SalesScreen'}
      headerMode="none"
      mode="card"
    >
      <Stack.Screen name={'SalesScreen'} component={SalesScreen} />

      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const LikesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'LikedScreen'}
      headerMode="none"
      mode="card"
    >
      <Stack.Screen name={'LikedScreen'} component={LikesScreen} />

      <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default SigningStack;
