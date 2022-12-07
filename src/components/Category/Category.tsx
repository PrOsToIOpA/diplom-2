import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {lightBlue, white} from '../../utils/constants/colors';
import {ICategory} from '../../store/types/programs';
import Icon from '../Icon';
import {categoriesImageSource} from '../../utils/constants/imageSource';

interface ILineCardProps {
  item: ICategory;
  id: number;
  active: boolean;
  onPress: () => void;
}

const Categories = ({item, active, onPress}: ILineCardProps) => {
  const getSourceCategoryImg = (item: ICategory) => {
    const arr = categoriesImageSource.find(imgItem => {
      return imgItem.name === item.name;
    });
    if (!arr) {
      return 'sport';
    }
    return arr?.source;
  };

  return (
    <TouchableOpacity
      style={[!active ? styles.categoryItem : styles.activeCategoryItem]}
      onPress={onPress}
    >
      <View>
        <Icon
          name={getSourceCategoryImg(item)}
          containerStyle={styles.categoryImage}
        />
      </View>
      <View>
        <Text
          style={[!active ? styles.categoryText : styles.activeCategoryText]}
        >
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginRight: calcWidth(3),
    borderWidth: calcWidth(1),
    paddingHorizontal: calcWidth(15),
    paddingVertical: calcHeight(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    borderColor: '#D2ECFE',
  },
  activeCategoryItem: {
    marginRight: calcWidth(3),
    borderWidth: calcWidth(1),
    paddingVertical: calcHeight(5),
    paddingHorizontal: calcWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
    borderColor: lightBlue,
    backgroundColor: lightBlue,
  },
  categoryText: {
    color: lightBlue,
    fontSize: calcFontSize(14),
    marginLeft: calcWidth(5),
  },
  activeCategoryText: {
    color: white,
    fontSize: calcFontSize(14),
    marginLeft: calcWidth(5),
  },
  categoryImage: {
    width: calcWidth(12),
    height: calcHeight(10),
  },
});

export default Categories;
