import * as types from '../actions/authActions';

interface IAction {
  type: string;
  data: string | IAuthReducer;
}

export interface IAuthReducer {
  access_token: string;
  token_type: string;
  expires_in: number;
  spoil_token: number;
  refresh_token: string;
  fcnToken: string;
}

const initialState: IAuthReducer = {
  access_token: '',
  expires_in: 0,
  spoil_token: 0,
  refresh_token: '',
  token_type: '',
  fcnToken: '',
};

const authReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.SET_FULL_RESPONSE: {
      const data = action.data;
      return {
        ...state,
        // @ts-ignore
        ...data,
        // @ts-ignore
        spoil_token: Date.now() + action.data.expires_in,
      };
    }
    case types.SET_ACCESS_TOKEN: {
      return {...state, access_token: action.data};
    }
    case types.SET_REFRESH_TOKEN: {
      return {...state, refresh_token: action.data};
    }
    case types.CLEAR_AUTH_REDUCER: {
      return {...initialState};
    }
    case types.FCN_TOKEN: {
      return {
        ...state,
        fcnToken: action.data,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
