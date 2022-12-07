import {NativeModules, Platform} from 'react-native';

export const getLanguage = () => {
  let locale = 'nl';
  if (Platform.OS === 'ios') {
    let localeLanguage =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      locale = localeLanguage;
    } else if (localeLanguage === 'de') {
      locale = localeLanguage;
    } else if (localeLanguage === 'bg') {
      locale = localeLanguage;
    }
  } else if (Platform.OS === 'android') {
    let localeLanguage = NativeModules.I18nManager.localeIdentifier;
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      locale = localeLanguage;
    } else if (localeLanguage === 'de') {
      locale = localeLanguage;
    } else if (localeLanguage === 'bg') {
      locale = localeLanguage;
    }
  }
  return locale;
};
export const getId = () => {
  let localeId = 10;
  if (Platform.OS === 'ios') {
    let localeLanguage =
      NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0];
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      localeId = 16;
    } else if (localeLanguage === 'de') {
      localeId = 14;
    } else if (localeLanguage === 'bg') {
      localeId = 11;
    }
  } else if (Platform.OS === 'android') {
    let localeLanguage = NativeModules.I18nManager.localeIdentifier;
    localeLanguage = localeLanguage.substring(0, 2);
    if (localeLanguage === 'fr') {
      localeId = 16;
    } else if (localeLanguage === 'de') {
      localeId = 14;
    } else if (localeLanguage === 'bg') {
      localeId = 11;
    }
  }
  return localeId;
};
