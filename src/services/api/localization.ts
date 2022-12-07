import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

export const translationGetters = {
  de: () => require('../../translations/de.json'),
  nl: () => require('../../translations/nl.json'),
  fr: () => require('../../translations/fr.json'),
  bg: () => require('../../translations/nl.json'),
};

export const translate = memoize((key: string, options?: any) =>
  i18n.t(key, options),
);

export const changeLanguage = (languageTag: string) => {
  // @ts-ignore
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

export const setI18nConfig = (language: string) => {
  // @ts-ignore
  translate.cache.clear();
  changeLanguage(`${language}`);
};

export const getCurrentLanguageTag = () => i18n.currentLocale();
