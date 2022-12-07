import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StatusBar,
  Linking,
  Platform,
} from 'react-native';
import {useNavigation} from '../../utils/navigation';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import CommonView from '../../components/Views/CommonView';
import CommonHeader from '../../components/Headers/CommonHeader';
import SalesCarousel from '../../components/Carousel/SalesCarousel';
import SmallCard from '../../components/Cards/SmallCard';
import LineCard from '../../components/Cards/LineCard';
import CouponComponent from '../../components/Coupon/CouponComponent';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {darkBlue, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

import SearchIcon from '../../../assets/svg/search-icon-gradient.svg';
import GridViewIcon from '../../../assets/svg/grid-view.svg';
import ListViewIcon from '../../../assets/svg/list-view.svg';

import {
  fetchCategories,
  fetchPrograms,
  fetchUnsortedPrograms,
  filterPrograms,
  setProgramText,
} from '../../store/actions/programsActions';
import {
  fetchUserAuthenticated,
  fetchUserLikes,
  fetchUserPlatform,
  fetchUserPromocod,
  fetchUserPushToken,
  setDeviceLanguage,
  updateUserDataAuthenticated,
} from '../../store/actions/userActions';

import {IRootReducer} from '../../store/reducers';
import Categories from '../../components/Category/Category';
import {deviceLanguage} from '../../utils/languageHelpers';
import messaging from '@react-native-firebase/messaging';
import {fetchFcnToken} from '../../store/actions/authActions';

export const Sales = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const {
    programs,
    searchProgramsText,
    isFetchingPrograms,
    lastProgramsUpdate,
    userLikes,
    userPromocod,
    isFetchingUserPromocod,
    isFetchingUserLikes,
    categories,
    isFetchingCategories,
    sendingFCMToken,
    userId,
    fcnToken,
    dataUserAuthenticated,
  } = useSelector((state: IRootReducer) => ({
    programs: state.programsReducer.programs,
    searchProgramsText: state.programsReducer.searchProgramsText,
    isFetchingPrograms: state.programsReducer.isFetchingPrograms,
    lastProgramsUpdate: state.programsReducer.lastProgramsUpdate,
    categories: state.programsReducer.categories,
    userLikes: state.userReducer.userLikes,
    userPromocod: state.userReducer.userPromocod,
    isFetchingUserLikes: state.userReducer.isFetchingUserLikes,
    isFetchingUserPromocod: state.userReducer.isFetchingUserPromocod,
    isFetchingCategories: state.programsReducer.isFetchingCategories,
    sendingFCMToken: state.userReducer.sendingFCMToken,
    userId: state.userReducer.userId,
    fcnToken: state.authReducer.fcnToken,
    dataUserAuthenticated: state.userReducer.dataUserAuthenticated,
  }));
  const isFocused = useIsFocused();

  const isDeviceLanguage = () => {
    const setLanguage = deviceLanguage();
    return dispatch(setDeviceLanguage(setLanguage));
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcnToken();
    }
  }

  const getFcnToken = async () => {
    try {
      const fcnToken = await messaging().getToken();
      console.log('fcnToken', fcnToken);
      dispatch(fetchFcnToken(fcnToken));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isFocused && StatusBar.setBarStyle('light-content');
    const shiftTime = lastProgramsUpdate + 20 * 60 * 1000; // 20 min to update
    Date.now() > shiftTime && dispatch(fetchPrograms());
  }, [isFocused]);

  // useEffect(() => {
  //   if (userId && !dataUserAuthenticated.length) {
  //     dispatch(
  //       fetchUserPushToken({
  //         id: userId,
  //         data: {
  //           push_token: fcnToken,
  //           platform: Platform.OS,
  //         },
  //       }),
  //     );
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   if (sendingFCMToken) {
  //     console.log('token true', sendingFCMToken);
  //   } else {
  //     console.log('token false', sendingFCMToken);
  //   }
  // }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(fetchCategories());
    dispatch(fetchUserLikes());
    dispatch(fetchUserPlatform(Platform.OS));
    dispatch(fetchUserPromocod());
    isDeviceLanguage();
  }, []);

  // useEffect(() => {
  //   if (
  //     userId &&
  //     fcnToken &&
  //     dataUserAuthenticated.length &&
  //     dataUserAuthenticated[0]?.push_token !== fcnToken
  //   ) {
  //     console.log('update');
  //     dispatch(
  //       updateUserDataAuthenticated({
  //         id: dataUserAuthenticated[0]?.id,
  //         data: {
  //           push_token: fcnToken,
  //           platform: Platform.OS,
  //         },
  //       }),
  //     );
  //   }
  // }, [userId]);

  const [allDiscountsMode, setAllDiscountsMode] = useState<'grid' | 'list'>(
    'grid',
  );
  const [active, setActive] = useState<number | null>(null);
  const onPressActive = (id: number | null) => {
    if (active === id) {
      id = null;
      dispatch(fetchUnsortedPrograms());
      setActive(id);
    } else {
      id !== null && dispatch(filterPrograms(id));
      setActive(id);
    }
  };

  const refreshHandle = () => {
    dispatch(fetchPrograms());
    dispatch(fetchCategories());
    dispatch(fetchUserLikes());
    dispatch(fetchUserPromocod());
  };

  const searchTextRef = useRef<TextInput>(null);

  const sortedPrograms = useMemo(() => {
    return programs?.sort((a, b) =>
      a.advertiser.name > b.advertiser.name
        ? 1
        : b.advertiser.name > a.advertiser.name
        ? -1
        : 0,
    );
  }, [programs]);

  return (
    <CommonView hideStatusBar={false}>
      <StatusBar backgroundColor={darkBlue} barStyle={'light-content'} />
      <CommonHeader
        title="Merken & webshops"
        icon="question"
        // onIconPress={() => dispatch(setAccessToken(''))}
        onIconPress={() =>
          Linking.openURL('https://raboom.nl/support').catch(e =>
            console.log('error', e),
          )
        }
      />
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={
              isFetchingPrograms ||
              isFetchingUserLikes ||
              isFetchingUserPromocod ||
              isFetchingCategories
            }
            onRefresh={refreshHandle}
            colors={['rgba(255,255,255,0.5)', white]}
            progressBackgroundColor={darkBlue}
            style={{backgroundColor: 'rgba(0,0,0,0)'}}
          />
        }
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon
              width={calcWidth(14)}
              height={calcWidth(14)}
              alignSelf="center"
            />
          </View>
          <TextInput
            ref={searchTextRef}
            value={searchProgramsText}
            onChangeText={newText => dispatch(setProgramText(newText))}
            placeholder="Zoeken"
            placeholderTextColor="gray"
            style={[styles.searchInputText]}
            editable={true}
            onFocus={_ => {
              navigate('SearchScreen', {searchFocus: true});
              searchTextRef.current?.blur();
            }}
          />
        </View>
        <View style={styles.line} />
        <View style={styles.filterCategory}>
          <FlatList
            data={categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            keyExtractor={(item, index) => `${index}`}
            renderItem={item => (
              <Categories
                item={item.item}
                id={item.item.id}
                active={item.item.id === active}
                onPress={() => onPressActive(item.item.id)}
              />
            )}
          />
        </View>
        <SalesCarousel
          data={programs! && programs.filter(item => item.spotlight)}
          marginBetween={calcWidth(15)}
          firstLastMargin={calcWidth(15)}
        />
        <View style={styles.allProgramsHeaderWrap}>
          <Text style={styles.allProgramsHeaderText}>Alle Kortingen</Text>
          <TouchableOpacity
            onPress={() =>
              setAllDiscountsMode(allDiscountsMode === 'grid' ? 'list' : 'grid')
            }
            style={styles.viewSwitchWrap}
          >
            {React.createElement(
              // @ts-ignore
              allDiscountsMode !== 'grid' ? GridViewIcon : ListViewIcon,
              {fill: white, width: calcWidth(14), height: calcHeight(14)},
            )}
          </TouchableOpacity>
        </View>
        {allDiscountsMode === 'grid' ? (
          <View style={styles.cardContainer}>
            <FlatList
              scrollEnabled={false}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              initialNumToRender={4}
              data={programs}
              renderItem={item => (
                <View>
                  {item.index === 4 && (
                    <CouponComponent
                      code={userPromocod}
                      isShownIcon={true}
                      margin={calcWidth(7.5)}
                    />
                  )}
                  {item.index % 2 === 0 &&
                  item.index + 1 < programs!?.length ? (
                    <View style={styles.positionCard}>
                      <SmallCard
                        item={programs![item.index]!}
                        isLiked={
                          userLikes &&
                          userLikes.includes(programs![item.index].id)
                        }
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: item.item,
                            isLiked:
                              userLikes &&
                              userLikes.includes(programs![item.index].id),
                          })
                        }
                      />
                      <SmallCard
                        item={programs![item.index + 1]}
                        isLiked={
                          userLikes &&
                          userLikes.includes(programs![item.index + 1].id)
                        }
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: programs![item.index + 1],
                            isLiked:
                              userLikes &&
                              userLikes.includes(programs![item.index + 1].id),
                          })
                        }
                      />
                      {item.index === programs!?.length - 1 &&
                        programs!?.length % 2 !== 0 && (
                          <View style={styles.emptyView} />
                        )}
                    </View>
                  ) : null}
                  {item.index % 2 === 0 &&
                  item.index === programs!?.length - 1 ? (
                    <View style={styles.positionCard}>
                      <SmallCard
                        item={programs![item.index]}
                        isLiked={
                          userLikes &&
                          userLikes.includes(programs![item.index].id)
                        }
                        onPress={() =>
                          navigate('ProgramDetailScreen', {
                            program: item.item,
                            isLiked:
                              userLikes &&
                              userLikes.includes(programs![item.index].id),
                          })
                        }
                      />
                      {item.index === programs!?.length - 1 &&
                        programs!?.length % 2 !== 0 && (
                          <View style={styles.emptyView} />
                        )}
                    </View>
                  ) : null}
                </View>
              )}
            />
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={sortedPrograms}
            renderItem={item => (
              <>
                {item.index === 4 && (
                  <View style={styles.bottom}>
                    <CouponComponent
                      code={userPromocod}
                      isShownIcon={true}
                      margin={calcWidth(15)}
                    />
                  </View>
                )}
                <LineCard
                  item={item.item}
                  isLiked={userLikes && userLikes.includes(item.item.id)}
                  onPress={() =>
                    navigate('ProgramDetailScreen', {
                      program: item.item,
                      isLiked: userLikes && userLikes.includes(item.item.id),
                    })
                  }
                />
              </>
            )}
          />
        )}
      </ScrollView>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: white,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f7',
    borderRadius: 10,
    paddingHorizontal: calcWidth(10),
    marginHorizontal: calcWidth(15),
    marginVertical: calcHeight(7.5),
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
  line: {
    height: calcHeight(1),
    backgroundColor: '#E1E1E1',
    marginBottom: calcWidth(12),
  },
  viewSwitchWrap: {
    width: calcWidth(28),
    height: calcWidth(28),
    borderRadius: 999,
    backgroundColor: darkBlue,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  allProgramsHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: calcWidth(15),
    marginVertical: calcHeight(15),
  },
  allProgramsHeaderText: {
    fontSize: calcFontSize(20),
    fontFamily: FONTS.Poppins.SemiBold600,
    letterSpacing: -0.5,
  },
  filterCategory: {
    paddingLeft: calcWidth(15),
    paddingBottom: calcHeight(10),
  },
  positionCard: {flexDirection: 'row'},
  cardContainer: {
    flex: 1,
    marginHorizontal: calcWidth(7.5),
  },
  emptyView: {
    flex: 1,
    margin: calcWidth(7.5),
  },
  bottom: {
    marginBottom: calcWidth(10),
  },
});

export default Sales;
