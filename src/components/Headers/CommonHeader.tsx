import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {darkBlue, red, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';
import {calcFontSize, calcWidth} from '../../utils/dimensions';
import QuestionSvg from '../../../assets/svg/question-cicrle.svg';
import ArrowBack from '../../../assets/svg/arrow-back.svg';
import RightPart from '../../../assets/svg/header-right-part.svg';
import LeftPart from '../../../assets/svg/header-left-part.svg';
import HeartIcon from '../../../assets/svg/heart.svg';
import HeartGradientIcon from '../../../assets/svg/heart-gradient-empty.svg';
import LogoutIcon from '../../../assets/svg/logout.svg';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';
import {fetchLogout} from '../../store/actions/signingActions';
import {fetchLikeDelete, fetchLikePost} from '../../store/actions/userActions';

interface ICommonHeaderProps {
  title: string;
  icon?: 'question' | 'goBack';
  onIconPress?: () => void;
  isLiked?: boolean;
  onLikedPress?: () => void;
  onNonLikedPress?: () => void;
  itemId?: number;
}

const CommonHeader = ({
  title,
  icon,
  onIconPress,
  isLiked,
  itemId,
}: ICommonHeaderProps) => {
  const {access_token} = useSelector(
    (state: IRootReducer) => state.authReducer,
  );
  const dispatch = useDispatch();
  const logoutOnPress = () => {
    dispatch(fetchLogout());
  };

  return (
    <View style={styles.main}>
      <RightPart position="absolute" height="100%" right="-7.5%" />
      <LeftPart position="absolute" height="100%" left="-7.5%" />
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        {icon && (
          <TouchableOpacity
            onPress={
              onIconPress
                ? onIconPress
                : () => console.log('HEADER ACTION!ASDASDA')
            }
          >
            {icon === 'question' && (
              <QuestionSvg
                width={calcWidth(18)}
                height={calcWidth(18)}
                marginTop={calcWidth(3)}
                padding={2}
              />
            )}
            {icon === 'goBack' && (
              <ArrowBack
                width={calcWidth(18)}
                height={calcWidth(18)}
                marginTop={calcWidth(3)}
                padding={2}
                fill={white}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 8, alignItems: 'center'}}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={{flex: 1}}>
        {isLiked === undefined ? null : isLiked ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                itemId !== undefined && dispatch(fetchLikeDelete(itemId));
              }}
            >
              <HeartIcon
                fill={red}
                width={calcWidth(16)}
                height={calcWidth(16)}
                marginTop={calcWidth(10)}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => {
                itemId !== undefined && dispatch(fetchLikePost(itemId));
              }}
            >
              <HeartGradientIcon
                width={calcWidth(16)}
                height={calcWidth(16)}
                marginTop={calcWidth(10)}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {access_token && (
        <TouchableOpacity onPress={logoutOnPress}>
          <LogoutIcon
            width={calcWidth(22)}
            height={calcWidth(22)}
            marginRight={calcWidth(10)}
            fill={white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: darkBlue,
    flex: 0.09,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: white,
    fontFamily: FONTS.Poppins.Bold700,
    fontSize: calcFontSize(16),
    marginTop: calcWidth(3),
  },
});

export default CommonHeader;
