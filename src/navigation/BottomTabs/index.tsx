import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StyleSheet, Text, View} from 'react-native';
import {setHeader} from '../../services/api/serviceAPI';
import {useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';
import {calcFontSize, calcWidth} from '../../utils/dimensions';
import {emptySearchColor, red, white} from '../../utils/constants/colors';

import DiscountActive from '../../../assets/svg/discount-active.svg';
import DiscountInactive from '../../../assets/svg/discount-inactive.svg';
import HeartIconActive from '../../../assets/svg/heart-icon-tab-bar-active.svg';
import HeartIconInactive from '../../../assets/svg/heart-icon-tab-bar-inactive.svg';
import SearchIconActive from '../../../assets/svg/search-icon-fill.svg';
import SearchIconInactive from '../../../assets/svg/search-icon-inactive.svg';
import BellIconActive from '../../../assets/svg/bell-active.svg';
import BellIconInactive from '../../../assets/svg/bell-inactive.svg';
import RaboomIconGradient from '../../../assets/svg/raboom-gradient.svg';
import RaboomIcon from '../../../assets/svg/raboom.svg';

import CustomBottomBar from '../../components/BottomBars/CustomBottomBar';
import SearchScreen from '../../screens/SearchScreen';

import ProgramDetailScreen from '../../screens/ProgramDetailScreen';

import {NotificationsScreen} from '../../screens/NotificationsScreen';
import {RaboomScreen} from '../../screens/RaboomScreen';
import {IProgram} from '../../store/types/programs';
import {LikesStack, SalesStack} from '../signingStack';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  const {token_type, access_token, programs, userLikes} = useSelector(
    (state: IRootReducer) => ({
      token_type: state.authReducer.token_type,
      access_token: state.authReducer.access_token,
      programs: state.programsReducer.programs,
      userLikes: state.userReducer.userLikes,
    }),
  );
  const isEmptyLikes =
    programs?.filter((i: IProgram) => userLikes && userLikes.includes(i.id))
      .length === 0;

  useEffect(() => {
    setHeader(
      'Authorization',
      `${
        token_type.toLowerCase() === 'bearer' ? 'Bearer' : ''
      } ${access_token}`,
    );
  });

  return (
    <Tab.Navigator
      initialRouteName="SalesScreen"
      tabBar={props => <CustomBottomBar {...props} />}
    >
      <Tab.Screen
        name="SalesScreen"
        component={SalesStack}
        options={{
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <DiscountActive width={size} height={size} />
            ) : (
              <DiscountInactive width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="LikedScreen"
        component={LikesStack}
        options={{
          // @ts-ignore //@todo make it right with ts, need to change options interface
          backgroundColorAll: isEmptyLikes ? emptySearchColor : white,
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <HeartIconActive width={size} height={size} />
            ) : (
              <HeartIconInactive width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <SearchIconActive width={size} height={size} />
            ) : (
              <SearchIconInactive width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <View>
              {focused ? (
                <BellIconActive width={size} height={size} />
              ) : (
                <BellIconInactive width={size} height={size} />
              )}
              <View style={styles.notificationTextWrap}>
                <Text style={styles.notificationText}>12</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="RaboomScreen"
        component={RaboomScreen}
        options={{
          tabBarIcon: ({focused, size}) =>
            focused ? (
              <RaboomIcon width={size} height={size} fill={white} />
            ) : (
              <RaboomIconGradient width={size} height={size} />
            ),
        }}
      />
      <Tab.Screen
        name="ProgramDetailScreen"
        component={ProgramDetailScreen}
        options={{
          // @ts-ignore //@todo make it right with ts, need to change options interface
          noIcon: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  notificationTextWrap: {
    position: 'absolute',
    right: calcWidth(-7),
    top: calcWidth(-5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: red,
    width: calcWidth(20),
    height: calcWidth(20),
    borderRadius: 99,
    borderWidth: calcWidth(2),
    borderColor: white,
  },
  notificationText: {
    fontSize: calcFontSize(10),
    color: white,
  },
});
