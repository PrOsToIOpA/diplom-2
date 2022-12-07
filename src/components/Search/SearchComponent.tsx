import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';

import SearchIcon from '../../../assets/svg/search-icon-gradient.svg';

interface ISearchComponentProps {
  placeholder?: string;
  refTextInput?: any;
  value: string;
  onChangeText: (newText: string) => void;
}

const SearchComponent = ({
  placeholder = 'Zoeken',
  refTextInput,
  value,
  onChangeText,
}: ISearchComponentProps) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchIconContainer}>
        <SearchIcon
          width={calcWidth(14)}
          height={calcWidth(14)}
          alignSelf="center"
        />
      </View>
      <TextInput
        ref={refTextInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={[styles.searchInputText]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f7',
    borderRadius: 10,
    padding: calcWidth(10),
    marginHorizontal: calcWidth(15),
    marginVertical: calcHeight(10),
  },
  searchInputText: {
    flex: 1,
    fontSize: calcFontSize(16),
    fontFamily: FONTS.Poppins.Regular400,
  },
  searchIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: calcWidth(5),
  },
});

export default SearchComponent;
