import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import CommonView from '../../components/Views/CommonView';
import CommonHeader from '../../components/Headers/CommonHeader';
import SmallCard from '../../components/Cards/SmallCard';

import {darkBlue, white} from '../../utils/constants/colors';
import {calcWidth} from '../../utils/dimensions';
import {IRootReducer} from '../../store/reducers';

import {fetchPrograms} from '../../store/actions/programsActions';
import {fetchUserLikes} from '../../store/actions/userActions';
import {IProgram} from '../../store/types/programs';
import LikesEmptyComponent from '../../components/emptyListComponents/LikesEmptyComponent';
import {useNavigation} from '../../utils/navigation';

const Likes = () => {
  const dispatch = useDispatch();
  const {programs} = useSelector(
    (state: IRootReducer) => state.programsReducer,
  );
  const {userLikes} = useSelector((state: IRootReducer) => state.userReducer);

  const isFocused = useIsFocused();

  useEffect(
    // @ts-ignore
    () => isFocused && StatusBar.setBarStyle('light-content'),
    [isFocused],
  );

  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchUserLikes());
  }, []);

  const filteredData = programs?.filter(
    (i: IProgram) => userLikes && userLikes.includes(i.id),
  );
  const {navigate} = useNavigation();

  return (
    <CommonView hideStatusBar={false}>
      <StatusBar backgroundColor={darkBlue} barStyle={'light-content'} />
      <CommonHeader title="Favorieten" />
      <View style={styles.main}>
        {filteredData?.length === 0 ? (
          <LikesEmptyComponent />
        ) : (
          <View style={styles.likesContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              initialNumToRender={4}
              data={filteredData}
              renderItem={item => (
                <View>
                  {item.index % 2 === 0 &&
                  item.index + 1 < filteredData!?.length ? (
                    <View style={styles.positionCard}>
                      <SmallCard
                        item={filteredData![item.index]}
                        isLiked={true}
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: item.item,
                            isLiked: true,
                          })
                        }
                      />
                      <SmallCard
                        item={filteredData![item.index + 1]}
                        isLiked={true}
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: filteredData![item.index + 1],
                            isLiked: true,
                          })
                        }
                      />
                      {item.index === filteredData!?.length - 1 &&
                        filteredData!?.length % 2 !== 0 && (
                          <View style={styles.emptyView} />
                        )}
                    </View>
                  ) : null}
                  {item.index % 2 === 0 &&
                  item.index === filteredData!?.length - 1 ? (
                    <View style={styles.positionCard}>
                      <SmallCard
                        item={filteredData![item.index]}
                        isLiked={true}
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: item.item,
                            isLiked: true,
                          })
                        }
                      />
                      {item.index === filteredData!?.length - 1 &&
                        filteredData!?.length % 2 !== 0 && (
                          <View style={styles.emptyView} />
                        )}
                    </View>
                  ) : null}
                </View>
              )}
            />
          </View>
        )}
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
  },
  likesContainer: {
    flex: 1,
    marginHorizontal: calcWidth(7.5),
  },
  positionCard: {flexDirection: 'row'},
  emptyView: {
    flex: 1,
    margin: calcWidth(7.5),
  },
});

export default Likes;
