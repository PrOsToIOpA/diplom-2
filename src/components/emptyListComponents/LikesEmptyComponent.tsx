import React from 'react';
import {darkBlue, emptySearchColor, white} from '../../utils/constants/colors';
import {Image, StyleSheet, Text, View} from 'react-native';
import {calcFontSize, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';

const LikesEmptyComponent = () => {
  return (
    <View style={{flex: 1, backgroundColor: emptySearchColor}}>
      <Image // ok
        source={require('../../../assets/png/no-favorites-background.png')}
        style={{width: '100%', height: calcWidth(350)}}
      />
      <Text style={styles.noFavoriteText}>
        Voeg jouw <Text style={{color: darkBlue}}>favoriete merken </Text>
        en webshops toe zodat je altijd snel kunt besparen.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noFavoriteText: {
    marginTop: calcWidth(20),
    width: '85%',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: calcFontSize(19),
    color: white,
    fontFamily: FONTS.Poppins.Bold700,
  },
});

export default LikesEmptyComponent;
