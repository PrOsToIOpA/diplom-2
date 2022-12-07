import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '../../utils/navigation';

import IconArrowBack from '../../../assets/svg/arrow-backNEED_TO_REPLACE.svg';
import {arrowBackStyles} from '../../styles/svgStyles';
import {calcWidth} from '../../utils/dimensions';

const RegisterHeader = () => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.iconContainer} onPress={goBack}>
        <IconArrowBack {...arrowBackStyles} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 0.09,
    flexDirection: 'row',
  },
  iconContainer: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginLeft: calcWidth(10),
    padding: calcWidth(5),
  },
});

export default RegisterHeader;
