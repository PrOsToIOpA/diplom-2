import apisauce, {ApisauceInstance} from 'apisauce';
import {urls} from '../../utils/constants/urls';
import {
  IApiPostClaims,
  IApiLogin,
  IApiRegistration,
  IApiPostUserPayout,
  ISetTokenToHeaders,
  IResetPassword,
} from './types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
let api: ApisauceInstance;
const createApi = (hostUrl: string) => {
  try {
    api = apisauce.create({
      baseURL: hostUrl,
      headers,
      timeout: 10000,
    });
    api.addRequestTransform(request => {
      console.log({URL: request.url, ...request.params});
    });
  } catch (error) {
    console.log({place: 'createApi', error});
  }
  return api;
};
createApi(urls.baseURL());

export const setHeader = (header: string, value: string) => {
  api.setHeader(header, value);
};

export const setBaseURL = (value: number) => {
  const newBaseURL = 'https://api.cashback.amg.nl/publishers/';
  api.setBaseURL(`${newBaseURL}${value}`);
};
export const getBaseURL = () => {
  return api.getBaseURL();
};

export const setTokenToHeaders = ({token}: ISetTokenToHeaders) => {
  const headersObj: any = {
    Authorization: token ? `Bearer ${token}` : undefined,
  };
  api.setHeaders(headersObj);
};

export const apiRegistration = (payload: IApiRegistration) => {
  return api.post(urls.registration(), payload);
};

export const apiLogin = (payload: IApiLogin) => {
  return api.post(urls.login(), payload);
};

export const apiResetPassword = (payload: IResetPassword) => {
  return api.post(urls.reset_password(), payload);
};

export const apiGetAdvertisers = () => {
  return api.get(urls.advertisers());
};

export const apiPostClaims = (payload: IApiPostClaims) => {
  return api.post(urls.claims(), payload);
};

export const apiGetUser = () => {
  return api.get(urls.user());
};

export const apiPostUserPayout = (payload: IApiPostUserPayout) => {
  return api.post(urls.payout(), payload);
};

export const apiGetUserTransactions = () => {
  return api.get(urls.transactions());
};

export const apiGetUserPayouts = () => {
  return api.get(urls.payouts());
};

export const apiGetUserLikes = () => {
  return api.get(urls.likes());
};

export const apiGetUserClicks = () => {
  return api.get(urls.clicks());
};

export const apiPostUserClicks = () => {
  return api.post(urls.magic_links());
};

export const apiGetPrograms = () => {
  return api.get(urls.programs());
};
export const apiGetCategories = () => {
  return api.get(urls.categories());
};

export const apiPostTrackingLink = (id: number) => {
  return api.post(urls.tracking_link(id));
};

export const apiPostLikeProgram = (id: number) => {
  return api.post(urls.like_program(id));
};

export const apiDeleteLikeProgram = (id: number) => {
  return api.delete(urls.like_program(id));
};

export const apiGetAuthenticatedUser = (ID: number) => {
  return api.get(urls.authenticated_user(ID));
};

export const apiPostPushToken = (payload: any) => {
  return api.post(urls.authenticated_user(payload.id), payload.data);
};

export const apiPostUpdatePushToken = (payload: any) => {
  return api.put(
    urls.update_authenticated_user(payload.ID, payload.id),
    payload.data,
  );
};
