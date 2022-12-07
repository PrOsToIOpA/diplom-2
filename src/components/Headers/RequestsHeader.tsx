import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '../../utils/navigation';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import {grey} from '../../utils/constants/colors';

interface IRequestsHeaderProps {
  onPress?: () => void;
}

const RequestsHeader = ({onPress}: IRequestsHeaderProps) => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.textContainer} onPress={onPress}>
        <Text style={styles.skipText}>Overslaan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 0.09,
    flexDirection: 'row-reverse',
  },
  textContainer: {
    alignSelf: 'center',
    marginRight: calcWidth(20),
    marginTop: calcHeight(12),
    padding: calcWidth(5),
  },
  skipText: {
    fontSize: calcFontSize(16),
    fontFamily: FONTS.Poppins.Regular400,
    letterSpacing: -0.25,
    color: grey,
  },
});

export default RequestsHeader;
