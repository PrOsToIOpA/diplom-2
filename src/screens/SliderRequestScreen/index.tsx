import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import OfferRequest from '../OfferRequestScreen';
import MoneyRequest from '../MoneyRequestScreen';
import NotificationRequest from '../NotificationRequestScreen';
import {useNavigation} from '../../utils/navigation';

const SliderRequest = () => {
  const swipeFlatListRef = useRef<SwiperFlatList>(null);

  const {navigate} = useNavigation();

  return (
    <View style={styles.main}>
      <SwiperFlatList
        index={0}
        ref={swipeFlatListRef}
        data={new Array(3)}
        renderItem={({index}) => (
          <View>
            {index === 0 && (
              <NotificationRequest
                navigationFunction={() => {
                  swipeFlatListRef.current!.scrollToIndex({
                    index: 1,
                    animated: true,
                  });
                }}
              />
            )}
            {index === 1 && (
              <OfferRequest
                navigationFunction={() => {
                  swipeFlatListRef.current!.scrollToIndex({
                    index: 2,
                    animated: true,
                  });
                }}
              />
            )}
            {index === 2 && (
              <MoneyRequest
                navigationFunction={() => {
                  navigate('PopOverScreen');
                }}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default SliderRequest;
