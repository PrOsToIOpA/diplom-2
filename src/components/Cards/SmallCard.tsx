import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {grey, red, white} from '../../utils/constants/colors';
import EuroIcon from '../../../assets/svg/convert-euro-icon.svg';
import HeartIcon from '../../../assets/svg/heart.svg';
import HeartGradientIcon from '../../../assets/svg/heart-gradient-empty.svg';
import {fetchLikeDelete, fetchLikePost} from '../../store/actions/userActions';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';

interface ISmallCardProps {
  item: any;
  isLiked?: boolean;
  onPress?: () => void;
}

const LABEL_HEIGHT = calcWidth(22);

const SmallCard = ({item, isLiked, onPress}: ISmallCardProps) => {
  const dispatch = useDispatch();
  // console.log('item', item);

  return (
    <TouchableOpacity style={styles.main} onPress={onPress}>
      {item.promotion && (
        <View style={styles.headerTextContainer}>
          <Text numberOfLines={2} style={styles.headerText}>
            {item.promotion}
          </Text>
        </View>
      )}
      <FastImage
        source={{uri: item.image_url}}
        style={[
          styles.imageContainer,
          {
            borderBottomLeftRadius: calcWidth(3),
            borderBottomRightRadius: calcWidth(3),
            borderTopLeftRadius: !item.promotion ? calcWidth(12) : 0,
            borderTopRightRadius: !item.promotion ? calcWidth(12) : 0,
          },
        ]}
      >
        <View style={styles.smallImageContainer}>
          <FastImage
            resizeMode="contain"
            source={{uri: item.advertiser.image_url}}
            style={styles.smallImage}
          />
        </View>
      </FastImage>
      {item.premium ? (
        <View style={[styles.amountContainer]}>
          <EuroIcon
            fill={white}
            width={calcWidth(15)}
            height={calcWidth(12)}
            alignSelf="center"
            marginLeft={calcWidth(6)}
          />
          <Text numberOfLines={1} style={styles.amountText}>
            {item.premium}
          </Text>
        </View>
      ) : null}
      <View style={styles.descriptionContainer}>
        <View style={styles.textAndIconWrap}>
          <Text numberOfLines={1} style={styles.descriptionHeader}>
            {item.advertiser.name}
          </Text>
          {isLiked ? (
            <TouchableOpacity
              style={styles.touchableOpacityStyle}
              onPress={() => {
                dispatch(fetchLikeDelete(item.id));
              }}
            >
              <HeartIcon
                fill={red}
                width={calcWidth(12)}
                height={calcWidth(12)}
                marginRight={calcWidth(5)}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.touchableOpacityStyle}
              onPress={() => {
                dispatch(fetchLikePost(item.id));
              }}
            >
              <HeartGradientIcon
                width={calcWidth(12)}
                height={calcWidth(12)}
                marginRight={calcWidth(5)}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.descriptionTextContainer}>
          <Text numberOfLines={3} style={styles.descriptionText}>
            {item.app.short_description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: calcWidth(7.5),
    height: calcWidth(230),
    justifyContent: 'flex-start',
  },
  headerTextContainer: {
    backgroundColor: 'rgb(210,240,255)',
    paddingHorizontal: calcWidth(7.5),
    paddingVertical: calcHeight(4),
    justifyContent: 'center',
    borderTopRightRadius: calcWidth(12),
    borderTopLeftRadius: calcWidth(12),
  },
  headerText: {
    color: 'rgb(0,174,255)',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  amountContainer: {
    minHeight: LABEL_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100.5%',
    alignSelf: 'center',
    backgroundColor: '#FB2B6F',
    borderRadius: 999,
    marginVertical: -(LABEL_HEIGHT / 2) - calcWidth(3),
  },
  amountText: {
    margin: calcWidth(3),
    color: white,
    fontFamily: FONTS.SFPro.Regular400,
    fontSize: calcFontSize(11.5),
    width: '83%',
  },
  descriptionContainer: {
    marginTop: calcWidth(15),
  },
  descriptionHeader: {
    fontSize: calcFontSize(15),
    fontFamily: FONTS.Poppins.SemiBold600,
    letterSpacing: -0.5,
    width: '90%',
  },
  textAndIconWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: calcWidth(5),
  },
  descriptionTextContainer: {
    marginVertical: calcHeight(0),
  },
  descriptionText: {
    lineHeight: 17.5,
    fontSize: calcFontSize(13),
    fontFamily: FONTS.Poppins.Regular400,
    color: grey,
  },
  smallImageContainer: {
    backgroundColor: 'rgb(255,255,255)',
    width: calcWidth(35),
    height: calcWidth(35),
    marginRight: calcWidth(5),
    marginBottom: LABEL_HEIGHT * 0.85,
    borderRadius: 999,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallImage: {
    width: calcWidth(27.5),
    height: calcWidth(27.5),
  },
  touchableOpacityStyle: {
    padding: calcWidth(5),
    margin: calcWidth(-5),
  },
});

export default SmallCard;
