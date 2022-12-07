import React, {useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';

import CommonView from '../../components/Views/CommonView';
import LineCard from '../../components/Cards/LineCard';
import SearchEmptyComponent from '../../components/SearchEmptyComponent';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {darkBlue, white} from '../../utils/constants/colors';
import {FONTS} from '../../utils/fonts';

import SearchIcon from '../../../assets/svg/search-icon-gradient.svg';

import {
  fetchPrograms,
  setProgramText,
} from '../../store/actions/programsActions';
import {fetchUserLikes} from '../../store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';

import {IRootReducer} from '../../store/reducers';
import {IProgram} from '../../store/types/programs';
import {useIsFocused} from '@react-navigation/native';
import {useNavigation} from '../../utils/navigation';

interface ISearchProps {
  route: {params: {searchFocus: boolean}};
}

export const Search = ({route}: ISearchProps) => {
  const dispatch = useDispatch();
  const {programs, searchProgramsText, isFetchingPrograms} = useSelector(
    (state: IRootReducer) => state.programsReducer,
  );
  const {userLikes, isFetchingUserLikes} = useSelector(
    (state: IRootReducer) => state.userReducer,
  );

  const searchTextRef = useRef<TextInput>(null);
  useEffect(() => {
    searchTextRef.current?.focus();
  }, [route?.params?.searchFocus]);

  const refreshHandle = () => {
    dispatch(fetchPrograms());
    dispatch(fetchUserLikes());
  };

  const isFocused = useIsFocused();

  useEffect(
    // @ts-ignore
    () => isFocused && StatusBar.setBarStyle('dark-content'),
    [isFocused],
  );

  const filteredPrograms = useMemo(() => {
    if (searchProgramsText === '') {
      return [];
    }

    return programs
      ?.filter((item: IProgram) => {
        return item.advertiser.name
          .toLowerCase()
          .match(`^${searchProgramsText.toLowerCase()}`);
      })
      ?.sort((a, b) =>
        a.advertiser.name > b.advertiser.name
          ? 1
          : b.advertiser.name > a.advertiser.name
          ? -1
          : 0,
      );
  }, [programs, searchProgramsText]);

  const {navigate} = useNavigation();
  return (
    <CommonView lightStyleBar>
      <StatusBar backgroundColor={white} barStyle={'dark-content'} />
      <ScrollView
        style={styles.main}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingPrograms || isFetchingUserLikes}
            onRefresh={refreshHandle}
            colors={['rgba(255,255,255,0.5)', white]}
            progressBackgroundColor={darkBlue}
            style={{backgroundColor: 'rgba(1,1,0,0)'}}
          />
        }
      >
        {/*@todo implement search component with ref*/}
        {/*<SearchComponent*/}
        {/*  value={searchProgramsText}*/}
        {/*  onChangeText={newText => dispatch(setProgramText(newText))}*/}
        {/*  // @ts-ignore*/}
        {/*  ref={searchTextRef}*/}
        {/*/>*/}
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
          />
        </View>
        <View>
          <FlatList
            scrollEnabled={false}
            style={{flex: 1}}
            nestedScrollEnabled
            ListEmptyComponent={() => <SearchEmptyComponent />}
            showsVerticalScrollIndicator={false}
            data={filteredPrograms}
            renderItem={item => (
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
            )}
          />
        </View>
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
    paddingVertical: calcWidth(7.5),
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
});

export default Search;
