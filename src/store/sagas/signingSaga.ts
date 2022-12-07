import {Alert} from 'react-native';
import {all, put, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions/signingActions';
import * as authActions from '../actions/authActions';
import {
  apiLogin,
  apiRegistration,
  apiResetPassword,
  setHeader,
} from '../../services/api/serviceAPI';
import {
  clearSigningReducer,
  failureForgotPassword,
  successForgotPassword,
} from '../actions/signingActions';
import {navigateRef} from '../../utils/navigation';
import {IApiLogin, IApiRegistration} from '../../services/api/types';
import {
  clearUserReducer,
  fetchUserLikes,
  fetchUserPromocod,
} from '../actions/userActions';
import {clearAuthReducer} from '../actions/authActions';
import {clearProgramsReducer} from '../actions/programsActions';

interface ISigningSagaAction {
  type: string;
  data: any;
}

interface IRegisterSagaAction extends ISigningSagaAction {
  data: IApiRegistration;
}
interface ILoginSagaAction extends ISigningSagaAction {
  data: IApiLogin;
}
interface IRefreshTokenSagaAction extends ISigningSagaAction {
  data: IApiLogin;
}

interface ILogoutSagaAction {
  type: string;
}

export function* registerSaga(action: IRegisterSagaAction) {
  console.log('signingSaga/registerSaga:', {action});
  try {
    // @ts-ignore
    const response = yield apiRegistration({
      email: action.data.email,
      verification: action.data.verification,
      password: action.data.password,
      first_name: action.data.first_name,
      birthdate: action.data.birthdate,
    });
    console.log('signingSaga/registerSaga:', {response});
    if (response?.status === 200) {
      yield put(actions.successRegister(response.data));
      navigateRef('IdInputScreen');
    } else {
      console.log('signingSaga/registerSaga: response error');
      yield put(actions.failureRegister());
      Alert.alert('Dit e-mailadres is reeds geregistreerd');
    }
  } catch (error) {
    console.log('signingSaga/registerSaga:', {error});
    yield put(actions.failureRegister());
    Alert.alert('Dit e-mailadres is reeds geregistreerd');
  }
}

export function* loginSaga(action: ILoginSagaAction) {
  console.log('signingSaga/loginSaga:', {action});
  try {
    // @ts-ignore
    const response = yield apiLogin({
      grant_type: action.data.grant_type,
      username: action.data.username,
      password: action.data.password,
    });
    console.log('signingSaga/loginSaga:', {response});
    if (response?.ok) {
      yield put(actions.successLogin());
      yield put(authActions.setFullResponse(response.data));
      setHeader(
        'Authorization',
        `${
          response?.data?.token_type?.toLowerCase() === 'bearer' ? 'Bearer' : ''
        } ${response?.data?.access_token}`,
      );
    } else {
      console.log('signingSaga/loginSaga: error');
      yield put(actions.failureLogin());
      Alert.alert(
        'Login mislukt, probeer het nogmaals of contact raboom@amg.nl',
      );
    }
  } catch (error) {
    console.log('signingSaga/loginSaga:', {error});
    yield put(actions.failureLogin());
    Alert.alert('Login mislukt, probeer het nogmaals of contact raboom@amg.nl');
  }
}

export function* refreshTokenSaga(action: IRefreshTokenSagaAction) {
  try {
    // @ts-ignore
    const response = yield apiLogin({
      grant_type: action.data.grant_type,
      refresh_token: action.data.refresh_token,
    });
    if (response?.ok) {
      yield put(authActions.setFullResponse(response.data));
      yield put(actions.successRefreshToken());
      yield put(fetchUserLikes());
      yield put(fetchUserPromocod());
    } else {
      console.log('signingSaga.ts/refreshTokenSaga: error');
      yield put(actions.failureRefreshToken());
    }
  } catch (error) {
    console.log('signingSaga.ts/refreshTokenSaga:', {error});
    yield put(actions.failureRefreshToken());
  }
}

export function* resetPasswordSaga(action: any) {
  console.log('signingSaga/resetPasswordSaga:', {action});
  try {
    // @ts-ignore
    const response = yield apiResetPassword({email: action.data.email});
    if (response?.ok) {
      yield put(successForgotPassword());
      Alert.alert('Check je e-mail');
      navigateRef('LoginScreen');
    } else {
      console.log('signingSaga/resetPasswordSaga: error');
      yield put(failureForgotPassword());
      Alert.alert('Failure forgot password');
    }
  } catch (error) {
    console.log('signingSaga/resetPasswordSaga:', {error});
    yield put(failureForgotPassword());
    Alert.alert('Failure forgot password');
  }
}

export function* finishedRegistartionSaga(action: any) {
  try {
    setHeader(
      'Authorization',
      `${
        action?.data?.token_type?.toLowerCase() === 'bearer' ? 'Bearer' : ''
      } ${action?.data?.access_token}`,
    );
  } catch (error) {
    Alert.alert('Dit e-mailadres is reeds geregistreerd');
    console.log('signingSaga/registerSaga:', {error});
  }
}

export function* logoutSaga(action: ILogoutSagaAction) {
  console.log('logoutSaga/llogoutSaga:', {action});
  try {
    yield put(clearAuthReducer());
    yield put(clearSigningReducer());
    yield put(clearProgramsReducer());
    yield put(clearUserReducer());
    navigateRef('LoginScreen');
  } catch (error) {
    console.log('signingSaga/loginSaga:', {error});
    yield put(actions.failureLogout());
    Alert.alert('Failure logout');
  }
}

export function* watchSigningSaga() {
  yield all([
    takeLatest(actions.FETCH_REGISTER as any, registerSaga),
    takeLatest(actions.FETCH_LOGIN as any, loginSaga),
    takeLatest(actions.FETCH_FORGOT_PASSWORD as any, resetPasswordSaga),
    takeLatest(actions.FETCH_REFRESH_TOKEN as any, refreshTokenSaga),
    takeLatest(authActions.SET_FULL_RESPONSE as any, finishedRegistartionSaga),
    takeLatest(actions.FETCH_LOGOUT as any, logoutSaga),
  ]);
}
