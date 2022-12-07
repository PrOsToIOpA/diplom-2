import {all} from 'redux-saga/effects';

import {watchSigningSaga} from './signingSaga';
import {watchProgramsSaga} from './programsSaga';
import {watchUserSaga} from './userSaga';

export default function* rootSaga() {
  yield all([watchSigningSaga(), watchProgramsSaga(), watchUserSaga()]);
}
