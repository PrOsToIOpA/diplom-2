import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import EuroIcon from '../../../assets/svg/convert-euro-icon.svg';
import {red, white} from '../../utils/constants/colors';
import HeartIcon from '../../../assets/svg/heart.svg';
import OpenIcon from '../../../assets/svg/arrow-open.svg';
import {IProgram} from '../../store/types/programs';
import {FONTS} from '../../utils/fonts';
import {useDispatch} from 'react-redux';
import {fetchLikeDelete, fetchLikePost} from '../../store/actions/userActions';
import HeartGradientIcon from '../../../assets/svg/heart-gradient-empty.svg';
import FastImage from 'react-native-fast-image';

interface ILineCardProps {
  item: IProgram;
  isLiked?: boolean;
  onPress?: () => void;
}

const LineCard = ({item, isLiked, onPress}: ILineCardProps) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      <View style={styles.imageContainer}>
        <FastImage
          resizeMode="contain"
          source={{uri: item.advertiser.image_url}}
          style={styles.image}
        />
      </View>
      <View style={styles.contentWrap}>
        <Text>{item.advertiser.name}</Text>
        {item.premium ? (
          <View style={styles.amountContainer}>
            <EuroIcon
              fill={white}
              width={calcHeight(18)}
              height={calcHeight(14)}
              alignSelf="center"
              marginLeft={calcWidth(3)}
            />
            <Text numberOfLines={1} style={styles.amountText}>
              {item.premium}
            </Text>
          </View>
        ) : null}
        {/*<View style={styles.amountContainer}>*/}
        {/*  <EuroIcon*/}
        {/*    fill={white}*/}
        {/*    width={calcHeight(18)}*/}
        {/*    height={calcHeight(14)}*/}
        {/*    alignSelf="center"*/}
        {/*    marginLeft={calcWidth(3)}*/}
        {/*  />*/}
        {/*  <Text numberOfLines={1} style={styles.amountText}>*/}
        {/*    {item.premium}*/}
        {/*  </Text>*/}
        {/*</View>*/}
      </View>
      <View style={styles.iconsWrap}>
        {isLiked ? (
          <TouchableOpacity
            style={styles.heartIconWrap}
            onPress={() => {
              dispatch(fetchLikeDelete(item.id));
            }}
          >
            <HeartIcon
              fill={red}
              width={calcWidth(15)}
              height={calcWidth(15)}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.heartIconWrap}
            onPress={() => {
              dispatch(fetchLikePost(item.id));
            }}
          >
            <HeartGradientIcon width={calcWidth(15)} height={calcWidth(15)} />
          </TouchableOpacity>
        )}
        <OpenIcon fill="#C7CED3" width={calcWidth(18)} height={calcWidth(18)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    marginHorizontal: calcWidth(15),
    marginBottom: calcHeight(10),
    flexDirection: 'row',
    paddingVertical: calcHeight(0),
  },
  imageContainer: {
    width: calcWidth(60),
    height: calcWidth(60),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: calcWidth(55),
    height: calcWidth(55),
    borderRadius: calcWidth(20),
    backgroundColor: white,
  },
  amountContainer: {
    flexDirection: 'row',
    backgroundColor: '#FB2B6F',
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  amountText: {
    margin: calcWidth(2),
    marginBottom: calcWidth(4),
    marginRight: calcWidth(9),
    width: '65%',
    color: white,
    fontFamily: FONTS.SFPro.Regular400,
    fontSize: calcFontSize(14),
  },
  contentWrap: {
    justifyContent: 'space-evenly',
    marginLeft: calcWidth(8),
    paddingVertical: calcHeight(2),
  },
  iconsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  heartIconWrap: {
    borderRadius: 999,
    backgroundColor: white,
    padding: calcWidth(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
});

export default LineCard;
