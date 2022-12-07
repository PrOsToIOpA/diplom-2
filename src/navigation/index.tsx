import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {BottomTabs} from './BottomTabs';
import SigningStack from './signingStack';

import {IRootReducer} from '../store/reducers';
import {fetchPrograms} from '../store/actions/programsActions';
import {setApiLanguage} from '../store/actions/userActions';

import {setI18nConfig} from '../services/api/localization';
import {getLanguage} from './defaultLanguage';
import {setBaseURL} from '../services/api/serviceAPI';

const MainNavigation = () => {
  const language = useSelector(
    (state: IRootReducer) => state.userReducer.language,
  );
  const apiVersion = useSelector(
    (state: IRootReducer) => state.userReducer.apiVersion,
  );

  // app pre-loading
  const locale = getLanguage();

  const finalLanguage = language ? language : locale;
  setBaseURL(apiVersion);
  setI18nConfig(finalLanguage);
  const {access_token} = useSelector(
    (state: IRootReducer) => state.authReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPrograms());
    dispatch(setApiLanguage({apiVersion: apiVersion, language: locale}));
  }, []);

  return access_token === '' ? <SigningStack /> : <BottomTabs />;
};
export default MainNavigation;
