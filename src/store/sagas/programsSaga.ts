import {all, put, takeLatest, select} from 'redux-saga/effects';
import * as actions from '../actions/programsActions';
import {
  apiGetPrograms,
  apiGetCategories,
  apiPostTrackingLink,
} from '../../services/api/serviceAPI';
import {Alert, Linking} from 'react-native';
import {optimizedData} from '../../utils/dataHelpers';

interface IProgramsSaga {
  type: string;
  data: any;
}

interface ITrackingLinkAction extends IProgramsSaga {
  data: number;
}

export function* programsSaga() {
  try {
    // @ts-ignore
    const response = yield apiGetPrograms();
    const {deviceLanguage} = yield select(state => state.userReducer);
    const optimizeData = optimizedData(response.data, deviceLanguage);
    if (response?.ok) {
      yield put(actions.successPrograms(optimizeData));
    } else {
      console.log('programsSaga.ts/programsSaga: error');
      yield put(actions.failurePrograms());
    }
  } catch (error) {
    console.log('programsSaga.ts/programsSaga:', {error});
    yield put(actions.failurePrograms());
  }
}

export function* categoriesSaga() {
  try {
    // @ts-ignore
    const response = yield apiGetCategories();
    if (response?.ok) {
      yield put(actions.successCategories(response.data));
    } else {
      console.log('categoriesSaga.ts/categoriesSaga: error');
      yield put(actions.failureCategories());
    }
  } catch (error) {
    console.log('categoriesSaga.ts/categoriesSaga:', {error});
    yield put(actions.failureCategories());
  }
}

export function* trackingLinkSaga(action: ITrackingLinkAction) {
  try {
    // @ts-ignore
    const response = yield apiPostTrackingLink(action.data);
    console.log('programsSaga.ts/trackingLinkSaga:', {response});
    if (response?.ok) {
      yield put(actions.successTrackingLink());
      Linking.openURL(response.data.tracking_link).catch(() =>
        Alert.alert('Unable to open URL'),
      );
    } else {
      console.log('programsSaga.ts/trackingLinkSaga: error');
      yield put(actions.failureTrackingLink());
    }
  } catch (error) {
    console.log('programsSaga.ts/trackingLinkSaga:', {error});
    yield put(actions.failureTrackingLink());
  }
}

export function* watchProgramsSaga() {
  yield all([
    takeLatest(actions.FETCH_PROGRAMS as any, programsSaga),
    takeLatest(actions.FETCH_CATEGORIES as any, categoriesSaga),
    takeLatest(actions.FETCH_TRACKING_LINK as any, trackingLinkSaga),
  ]);
}
