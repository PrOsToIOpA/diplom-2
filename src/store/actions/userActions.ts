import {ISetApiVersion} from '../../services/api/types';

export const FETCH_USER_LIKES = 'FETCH_USER_LIKES';
export const SUCCESS_USER_LIKES = 'SUCCESS_USER_LIKES';
export const FAILURE_USER_LIKES = 'FAILURE_USER_LIKES';
export const fetchUserLikes = () => ({
  type: FETCH_USER_LIKES,
});
export const successUserLikes = (data: Array<number>) => ({
  type: SUCCESS_USER_LIKES,
  data,
});
export const failureUserLikes = () => ({
  type: FAILURE_USER_LIKES,
});
export const FETCH_LIKE_POST = 'FETCH_LIKE_POST';
export const SUCCESS_LIKE_POST = 'SUCCESS_LIKE_POST';
export const FAILURE_LIKE_POST = 'FAILURE_LIKE_POST';
export const fetchLikePost = (data: number) => ({
  type: FETCH_LIKE_POST,
  data,
});
export const successLikePost = () => ({
  type: SUCCESS_LIKE_POST,
});
export const failureLikePost = () => ({
  type: FAILURE_LIKE_POST,
});
export const FETCH_USER_PROMOCOD = 'FETCH_USER_PROMOCOD';
export const SUCCESS_USER_PROMOCOD = 'SUCCESS_USER_PROMOCOD';
export const FAILURE_USER_PROMOCOD = 'FAILURE_USER_PROMOCOD';
export const SUCCESS_USER_ID = 'SUCCESS_USER_ID';
export const FETCH_USER_PUSH_TOKEN = 'FETCH_USER_PUSH_TOKEN';
export const FETCH_USER_PUSH_AUTHENTICATED = 'FETCH_USER_PUSH_AUTHENTICATED';

export const fetchUserPromocod = () => ({
  type: FETCH_USER_PROMOCOD,
});
export const successUserPromocod = (data: string) => ({
  type: SUCCESS_USER_PROMOCOD,
  data,
});
export const successUserId = (data: number) => ({
  type: SUCCESS_USER_ID,
  data,
});
export const failureUserPromocod = () => ({
  type: FAILURE_USER_PROMOCOD,
});
export const fetchUserPushToken = (payload: any) => ({
  type: FETCH_USER_PUSH_TOKEN,
  payload,
});
export const fetchUserAuthenticated = (data: number | null) => ({
  type: FETCH_USER_PUSH_AUTHENTICATED,
  data,
});
export const FETCH_LIKE_DELETE = 'FETCH_LIKE_DELETE';
export const SUCCESS_LIKE_DELETE = 'SUCCESS_LIKE_DELETE';
export const FAILURE_LIKE_DELETE = 'FAILURE_LIKE_DELETE';
export const fetchLikeDelete = (data: number) => ({
  type: FETCH_LIKE_DELETE,
  data,
});
export const successLikeDelete = () => ({
  type: SUCCESS_LIKE_DELETE,
});
export const failureLikeDelete = () => ({
  type: FAILURE_LIKE_DELETE,
});

export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const addLike = (data: number) => ({
  type: ADD_LIKE,
  data,
});
export const removeLike = (data: number) => ({
  type: REMOVE_LIKE,
  data,
});
export const GET_API_LANGUAGE = 'GET_API_LANGUAGE';
export const SET_API_LANGUAGE = 'SET_API_LANGUAGE';

export const getApiLanguage = () => ({
  type: GET_API_LANGUAGE,
});
export const setApiLanguage = (data: ISetApiVersion) => ({
  type: SET_API_LANGUAGE,
  data,
});

export const SET_DEVICE_LANGUAGE = 'SET_DEVICE_LANGUAGE';

export const setDeviceLanguage = (data: string) => ({
  type: SET_DEVICE_LANGUAGE,
  data,
});

export const CLEAR_USER_REDUCER = 'CLEAR_USER__REDUCER';
export const clearUserReducer = () => ({
  type: CLEAR_USER_REDUCER,
});

export const SUCCESS_USER_DATA = 'SUCCESS_USER_DATA';
export const successUserDataAuthenticated = (data: any) => ({
  type: SUCCESS_USER_DATA,
  data,
});
export const FETCH_UPDATE_USER_PUSH_TOKEN = 'FETCH_UPDATE_USER_PUSH_TOKEN';
export const updateUserDataAuthenticated = (payload: any) => ({
  type: FETCH_UPDATE_USER_PUSH_TOKEN,
  payload,
});

export const FETCH_USER_DATA_INSTALLATIONS = 'FETCH_USER_DATA_INSTALLATIONS';
export const fetchUserDataInstallations = () => ({
  type: FETCH_USER_DATA_INSTALLATIONS,
});

export const FETCH_USER_PLATFORM = 'FETCH_USER_PLATFORM';
export const fetchUserPlatform = (data: string) => ({
  type: FETCH_USER_PLATFORM,
  data,
});
