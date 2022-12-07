import {
  IApiLogin,
  IApiRegistration,
  IResetPassword,
} from '../../services/api/types';
import {IAuthReducer} from '../reducers/authReducer';

export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_RABOOMID = 'SET_RABOOMID';
export const SET_EMAIL_CHECKER = 'SET_EMAIL_CHECKER';
export const SET_RABOOMID_CHECKER = 'SET_RABOOMID_CHECKER';

export const setName = (data: string) => ({
  type: SET_NAME,
  data,
});
export const setEmail = (data: string) => ({
  type: SET_EMAIL,
  data,
});
export const setPassword = (data: string) => ({
  type: SET_PASSWORD,
  data,
});
export const setRaboomID = (data: string) => ({
  type: SET_RABOOMID,
  data,
});
export const setEmailChecker = (data: boolean) => ({
  type: SET_EMAIL_CHECKER,
  data,
});
export const setRaboomIDChecker = (data: boolean) => ({
  type: SET_RABOOMID_CHECKER,
  data,
});

export const FETCH_REGISTER = 'FETCH_REGISTER';
export const SUCCESS_REGISTER = 'SUCCESS_REGISTER';
export const FAILURE_REGISTER = 'FAILURE_REGISTER';
export const fetchRegister = (data: IApiRegistration) => ({
  type: FETCH_REGISTER,
  data,
});
export const successRegister = (data: IAuthReducer) => ({
  type: SUCCESS_REGISTER,
  data,
});
export const failureRegister = () => ({
  type: FAILURE_REGISTER,
});

export const FETCH_LOGIN = 'FETCH_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAILURE_LOGIN = 'FAILURE_LOGIN';
export const fetchLogin = (data: IApiLogin) => ({
  type: FETCH_LOGIN,
  data,
});
export const successLogin = () => ({
  type: SUCCESS_LOGIN,
});
export const failureLogin = () => ({
  type: FAILURE_LOGIN,
});

export const FETCH_FORGOT_PASSWORD = 'FETCH_FORGOT_PASSWORD';
export const SUCCESS_FORGOT_PASSWORD = 'SUCCESS_FORGOT_PASSWORD';
export const FAILURE_FORGOT_PASSWORD = 'FAILURE_FORGOT_PASSWORD';
export const fetchForgotPassword = (data: IResetPassword) => ({
  type: FETCH_FORGOT_PASSWORD,
  data,
});
export const successForgotPassword = () => ({
  type: SUCCESS_FORGOT_PASSWORD,
});
export const failureForgotPassword = () => ({
  type: FAILURE_FORGOT_PASSWORD,
});

export const FETCH_REFRESH_TOKEN = 'FETCH_REFRESH_TOKEN';
export const SUCCESS_REFRESH_TOKEN = 'SUCCESS_REFRESH_TOKEN';
export const FAILURE_REFRESH_TOKEN = 'FAILURE_REFRESH_TOKEN';
export const fetchRefreshToken = (data: IApiLogin) => ({
  type: FETCH_REFRESH_TOKEN,
  data,
});
export const successRefreshToken = () => ({
  type: SUCCESS_REFRESH_TOKEN,
});
export const failureRefreshToken = () => ({
  type: FAILURE_REFRESH_TOKEN,
});

export const CLEAR_SIGNING_REDUCER = 'CLEAR_SIGNING_REDUCER';
export const clearSigningReducer = () => ({
  type: CLEAR_SIGNING_REDUCER,
});

export const FETCH_LOGOUT = 'FETCH_LOGOUT';
export const fetchLogout = () => ({
  type: FETCH_LOGOUT,
});

export const FAILURE_LOGOUT = 'FAILURE_LOGOUT';
export const failureLogout = () => ({
  type: FAILURE_LOGOUT,
});

export const SET_USER_BIRTH = 'SET_USER_BIRTH';
export const setUserBirth = (data: any) => ({
  type: SET_USER_BIRTH,
  data,
});
