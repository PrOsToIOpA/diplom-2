import React from 'react';
import {View, StyleSheet} from 'react-native';

const EmptyHeader = () => {
  return <View style={styles.main} />;
};

const styles = StyleSheet.create({
  main: {
    flex: 0.09,
    flexDirection: 'row',
  },
});

export default EmptyHeader;
