import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {magenta} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

export const SearchEmptyComponent = () => {
  return (
    <View style={styles.main}>
      <Image // ok
        source={require('../../../assets/png/search-empty.png')}
        style={styles.image}
      />
      <Text style={styles.text}>
        Zoek jouw {<Text style={{color: magenta}}>favoriete merken</Text>} en
        webshops!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: calcHeight(20),
  },
  image: {
    width: '100%',
    height: calcHeight(300),
  },
  text: {
    fontFamily: FONTS.Poppins.Regular400,
    fontSize: calcFontSize(22),
    textAlign: 'center',
    marginHorizontal: calcWidth(40),
    marginTop: calcHeight(20),
  },
});

export default SearchEmptyComponent;
