import {NativeModules, Platform} from 'react-native';

export const deviceLanguage = () => {
  let locale = 'nl';
  if (Platform.OS === 'ios') {
    let localeLanguage =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      locale = localeLanguage;
    } else if (localeLanguage === 'en') {
      locale = localeLanguage;
    }
  } else if (Platform.OS === 'android') {
    let localeLanguage = NativeModules.I18nManager.localeIdentifier;
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      locale = localeLanguage;
    } else if (localeLanguage === 'en') {
      locale = localeLanguage;
    }
  }
  return locale;
};
