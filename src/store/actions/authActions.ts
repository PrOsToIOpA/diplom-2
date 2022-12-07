import {IAuthReducer} from '../reducers/authReducer';

export const SET_FULL_RESPONSE = 'SET_FULL_RESPONSE';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';
export const SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN';

export const setFullResponse = (data: IAuthReducer) => ({
  type: SET_FULL_RESPONSE,
  data,
});

export const setAccessToken = (data: string) => ({
  type: SET_ACCESS_TOKEN,
  data,
});

export const setRefreshToken = (data: string) => ({
  type: SET_REFRESH_TOKEN,
  data,
});

export const CLEAR_AUTH_REDUCER = 'CLEAR_AUTH_REDUCER';
export const clearAuthReducer = () => ({
  type: CLEAR_AUTH_REDUCER,
});

export const FCN_TOKEN = 'FCN_TOKEN';
export const fetchFcnToken = (data: string) => ({
  type: FCN_TOKEN,
  data,
});
