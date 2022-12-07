import {View, StyleSheet} from 'react-native';
import * as React from 'react';
import {BottomTabs} from '../navigation/BottomTabs';

export const MainScreen = () => {
  return (
    <View style={styles.container}>
      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
});
