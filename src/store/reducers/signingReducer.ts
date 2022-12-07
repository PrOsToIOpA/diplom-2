import * as types from '../actions/signingActions';

interface IAction {
  type: string;
  data: any;
}

export interface ISigningReducer {
  name: string;
  email: string;
  password: string;
  raboomID: string;
  emailChecker: boolean;
  raboomIDChecker: boolean;
  isFetchingRegister: boolean;
  isFetchingLogin: boolean;
  isFetchingRefreshToken: boolean;
  isFetchingForgotPassword: boolean;
  finishedRegistration: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  spoil_token: number;
  refresh_token: string;
  userBirth: string;
}
const initialState: ISigningReducer = {
  name: '',
  email: '',
  password: '',
  raboomID: 'RABOOM785',
  emailChecker: false,
  raboomIDChecker: false,
  isFetchingRegister: false,
  isFetchingLogin: false,
  isFetchingRefreshToken: false,
  isFetchingForgotPassword: false,
  finishedRegistration: false,
  access_token: '',
  expires_in: 0,
  spoil_token: 0,
  refresh_token: '',
  token_type: '',
  userBirth: '',
};

const signingReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.FETCH_REGISTER: {
      return {
        ...state,
        isFetchingRegister: true,
      };
    }
    case types.SUCCESS_REGISTER: {
      return {
        ...state,
        ...action.data,
        spoil_token: Date.now() + action.data.expires_in,
        isFetchingRegister: false,
      };
    }
    case types.FAILURE_REGISTER: {
      return {
        ...state,
        isFetchingRegister: false,
      };
    }
    case types.FETCH_LOGIN: {
      return {
        ...state,
        isFetchingLogin: true,
      };
    }
    case types.SUCCESS_LOGIN: {
      return {
        ...state,
        isFetchingLogin: false,
      };
    }
    case types.FAILURE_LOGIN: {
      return {
        ...state,
        isFetchingLogin: false,
      };
    }
    case types.FETCH_REFRESH_TOKEN: {
      return {
        ...state,
        isFetchingRefreshToken: true,
      };
    }
    case types.SUCCESS_REFRESH_TOKEN: {
      return {
        ...state,
        isFetchingRefreshToken: false,
      };
    }
    case types.FAILURE_REFRESH_TOKEN: {
      return {
        ...state,
        isFetchingRefreshToken: false,
      };
    }
    case types.FETCH_FORGOT_PASSWORD: {
      return {
        ...state,
        isFetchingForgotPassword: true,
      };
    }
    case types.SUCCESS_FORGOT_PASSWORD: {
      return {
        ...state,
        isFetchingForgotPassword: false,
      };
    }
    case types.FAILURE_FORGOT_PASSWORD: {
      return {
        ...state,
        isFetchingForgotPassword: false,
      };
    }

    case types.SET_NAME: {
      return {
        ...state,
        name: action.data,
      };
    }
    case types.SET_EMAIL: {
      return {
        ...state,
        email: action.data,
      };
    }
    case types.SET_PASSWORD: {
      return {
        ...state,
        password: action.data,
      };
    }
    case types.SET_RABOOMID: {
      return {
        ...state,
        raboomID: action.data,
      };
    }
    case types.SET_EMAIL_CHECKER: {
      return {
        ...state,
        emailChecker: action.data,
      };
    }
    case types.SET_RABOOMID_CHECKER: {
      return {
        ...state,
        raboomIDChecker: action.data,
      };
    }
    case types.CLEAR_SIGNING_REDUCER: {
      return {...initialState};
    }
    case types.SET_USER_BIRTH: {
      return {...state, userBirth: action.data};
    }
    default:
      return state;
  }
};

export default signingReducer;
