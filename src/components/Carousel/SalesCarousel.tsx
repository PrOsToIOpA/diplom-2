import React, {useRef} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {calcFontSize, calcWidth} from '../../utils/dimensions';
import {FONTS} from '../../utils/fonts';
import BigCard from '../Cards/BigCard';
import {IProgram} from '../../store/types/programs';
import {useDispatch, useSelector} from 'react-redux';
import {IRootReducer} from '../../store/reducers';
import {useNavigation} from '../../utils/navigation';

interface ISalesCarouselProps {
  data: Array<IProgram>;
  marginBetween?: number;
  firstLastMargin?: number;
}

const SalesCarousel = ({
  data,
  marginBetween,
  firstLastMargin,
}: ISalesCarouselProps) => {
  const flatListRef = useRef<FlatList>(null);
  const {userLikes} = useSelector((state: IRootReducer) => state.userReducer);
  const {navigate} = useNavigation();
  return (
    <View style={styles.main}>
      <View style={styles.headerStyle}>
        <Text style={[styles.headerText, {marginLeft: firstLastMargin}]}>
          Populaire kortingen
        </Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          horizontal
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          renderItem={item => (
            <BigCard
              data={item}
              lastElementIndex={data.length - 1}
              marginBetween={marginBetween && marginBetween / 2}
              firstLastMargin={firstLastMargin && firstLastMargin}
              isLiked={userLikes && userLikes.includes(item.item.id)}
              onPress={() =>
                navigate('ProgramDetailScreen', {
                  program: item.item,
                  isLiked: userLikes && userLikes.includes(item.item.id),
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: calcWidth(15),
  },
  headerText: {
    flex: 6,
    fontSize: calcFontSize(20),
    fontFamily: FONTS.Poppins.SemiBold600,
    letterSpacing: -0.5,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {},
});

export default SalesCarousel;
