import {all, put, takeLatest, select} from 'redux-saga/effects';
import * as actions from '../actions/userActions';
import {
  apiDeleteLikeProgram,
  apiGetAuthenticatedUser,
  apiGetUser,
  apiGetUserLikes,
  apiPostLikeProgram,
  apiPostPushToken,
  apiPostUpdatePushToken,
} from '../../services/api/serviceAPI';
import {fetchRefreshToken} from '../actions/signingActions';
import {IRootReducer} from '../reducers';

interface IUserSaga {
  type: string;
  data: any;
}
interface ILikeAction extends IUserSaga {
  data: number;
}

export function* userLikesSaga() {
  try {
    // @ts-ignore
    const response = yield apiGetUserLikes();
    if (response?.ok) {
      const sortedResponse = response?.data.map((i: any) => i.program_id);
      yield put(actions.successUserLikes(sortedResponse));
    } else {
      // @ts-ignore
      const refreshToken = yield select(
        (state: IRootReducer) => state.authReducer.refresh_token,
      );
      yield put(actions.failureUserLikes());
      yield put(
        fetchRefreshToken({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      ); // auth actions re login user via refresh token
    }
  } catch (error) {
    console.log('userSaga.ts/userLikesSaga:', {error});
    yield put(actions.failureUserLikes());
  }
}
export function* userPromocodSaga() {
  try {
    // @ts-ignore
    const response = yield apiGetUser();
    if (response?.ok) {
      yield put(actions.successUserPromocod(response.data.referral_code));
      yield put(actions.successUserId(response.data.id));
      yield put(actions.fetchUserDataInstallations());
    } else {
      // @ts-ignore
      const refreshToken = yield select(
        (state: IRootReducer) => state.authReducer.refresh_token,
      );
      console.log('userSaga.ts/userPromocodSaga: error');
      yield put(actions.failureUserPromocod());
      yield put(
        fetchRefreshToken({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      ); // auth actions re login user via refresh token
    }
  } catch (error) {
    console.log('userSaga.ts/userPromocodSaga:', {error});
    yield put(actions.failureUserPromocod());
  }
}

export function* likePostSaga(action: ILikeAction) {
  try {
    yield put(actions.addLike(action.data));
    // @ts-ignore
    const response = yield apiPostLikeProgram(action.data);
    if (response?.ok) {
      yield put(actions.successLikePost());
    } else {
      console.log('userSaga.ts/likePostSaga: error');
      yield put(actions.failureLikePost());
    }
  } catch (error) {
    console.log('userSaga.ts/likePostSaga:', {error});
    yield put(actions.failureLikePost());
  }
}

export function* likeDeleteSaga(action: ILikeAction) {
  try {
    yield put(actions.removeLike(action.data));
    // @ts-ignore
    const response = yield apiDeleteLikeProgram(action.data);
    if (response?.ok) {
      yield put(actions.successLikeDelete());
    } else {
      console.log('userSaga.ts/likeDeleteSaga: error');
      yield put(actions.failureLikeDelete());
    }
  } catch (error) {
    console.log('userSaga.ts/likeDeleteSaga:', {error});
    yield put(actions.failureLikeDelete());
  }
}

export function* updatePushTokenSaga(action: any) {
  try {
    // @ts-ignore
    yield apiPostUpdatePushToken(action.payload);
  } catch (e) {
    console.log('error pushTokenSaga', e);
  }
}

export function* workerSaga() {
  const {apiVersion} = yield select(state => state.userReducer);
  const {fcnToken} = yield select(state => state.authReducer);
  const {platform} = yield select(state => state.userReducer);
  // @ts-ignore
  const res = yield apiGetAuthenticatedUser(apiVersion);

  if (res?.ok) {
    if (!res?.data?.length) {
      //@ts-ignore
      yield apiPostPushToken({
        id: apiVersion,
        data: {
          push_token: fcnToken,
          platform: platform,
        },
      });
    }
    if (res?.data?.length && res.data[0]?.push_token !== fcnToken) {
      //@ts-ignore
      yield apiPostUpdatePushToken({
        id: res?.data[0]?.id,
        ID: apiVersion,
        data: {
          push_token: fcnToken,
          platform: platform,
        },
      });
    }
  }
}

export function* watchUserSaga() {
  yield all([
    takeLatest(actions.FETCH_USER_LIKES as any, userLikesSaga),
    takeLatest(actions.FETCH_USER_PROMOCOD as any, userPromocodSaga),
    takeLatest(actions.FETCH_LIKE_POST as any, likePostSaga),
    takeLatest(actions.FETCH_LIKE_DELETE as any, likeDeleteSaga),
    takeLatest(
      actions.FETCH_UPDATE_USER_PUSH_TOKEN as any,
      updatePushTokenSaga,
    ),
    takeLatest(actions.FETCH_USER_DATA_INSTALLATIONS as any, workerSaga),
  ]);
}
