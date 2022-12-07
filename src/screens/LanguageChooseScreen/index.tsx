import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  LayoutAnimation,
  UIManager,
  Image,
} from 'react-native';
import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import {black, grey} from '../../utils/constants/colors';
import CommonView from '../../components/Views/CommonView';
import {CommonButton} from '../../components/Buttons/CommonButton';
import StepByStep from '../../components/StepByStep';
import {stepByStepRegister} from '../../styles/stepByStep';
import {useNavigation} from '../../utils/navigation';
import ArrowUpIcon from '../../../assets/svg/arrow-up.svg';
import RegisterHeader from '../../components/Headers/RegisterHeader';
import {useDispatch} from 'react-redux';
import {setApiLanguage} from '../../store/actions/userActions';
import {setBaseURL} from '../../services/api/serviceAPI';
import {translate, setI18nConfig} from '../../services/api/localization';
import {listLanguages} from '../../utils/constants/shortLanguages';

const arrowUpSize = calcWidth(12);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LanguageChooseScreen = () => {
  const onPressChangeLanguage = (item: any) => {
    setLanguage(item.item);
    setShowLanguages(!showLanguages);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(
      setApiLanguage({
        apiVersion: item.item.id,
        language: item.item.shortLanguage,
      }),
    );
    setBaseURL(item.item.id);
    setI18nConfig(item.item.shortLanguage);
  };
  const {navigate} = useNavigation();
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState(listLanguages[0]);
  const dispatch = useDispatch();
  const onPressOpenLanguages = () => {
    setShowLanguages(!showLanguages);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  return (
    <CommonView style={[styles.main, Platform.OS === 'ios' && {marginTop: 75}]}>
      <RegisterHeader />
      <View style={{flex: 4}}>
        <View style={styles.marginContainer}>
          <View>
            <Text style={styles.text}>Selecteer je land</Text>
            <TouchableOpacity
              style={styles.languageItemChoosen}
              onPress={onPressOpenLanguages}
            >
              <Image // ok
                source={language.source}
                style={{width: calcWidth(15), height: calcHeight(12)}}
              />
              <Text>{language.language}</Text>
              {/*@ts-ignore*/}
              <ArrowUpIcon
                fill="#7A7985"
                width={arrowUpSize}
                height={arrowUpSize}
                transform={[{rotateZ: showLanguages ? 0 : 3.15}]}
              />
            </TouchableOpacity>
            {showLanguages && (
              <FlatList
                data={listLanguages}
                keyExtractor={(item, index) => `${index}`}
                renderItem={item => (
                  <View>
                    <TouchableOpacity
                      style={styles.languageItem}
                      onPress={() => {
                        onPressChangeLanguage(item);
                      }}
                    >
                      <Image // ok
                        source={item.item.source}
                        style={{width: calcWidth(15), height: calcHeight(12)}}
                      />
                      <Text style={{flex: 1, textAlign: 'center'}}>
                        {item.item.language}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </View>

      <View style={styles.margin}>
        <View>
          <CommonButton
            onPress={() => navigate('BirthDate')}
            text={translate('Volgende')}
          />
          <View style={{marginTop: calcHeight(25)}}>
            <StepByStep steps={6} currentStep={1} style={stepByStepRegister} />
          </View>
        </View>
      </View>
    </CommonView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: calcHeight(20),
  },
  margin: {
    flex: 1,
    marginHorizontal: calcWidth(20),
  },
  marginContainer: {
    marginHorizontal: calcWidth(20),
  },
  languageItem: {
    backgroundColor: '#F5F8F9',
    fontSize: calcFontSize(14),
    marginVertical: calcHeight(2),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: grey,
    paddingVertical: calcWidth(5),
    paddingLeft: calcWidth(15),
    color: black,
    flexDirection: 'row',
  },
  languageItemChoosen: {
    backgroundColor: '#F5F8F9',
    fontSize: calcFontSize(18),
    marginBottom: calcHeight(20),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: grey,
    paddingVertical: calcWidth(10),
    paddingHorizontal: calcWidth(10),
    color: black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: calcHeight(58),
    marginBottom: calcHeight(100),
    fontWeight: 'bold',
    lineHeight: 23,
  },
});

export default LanguageChooseScreen;
