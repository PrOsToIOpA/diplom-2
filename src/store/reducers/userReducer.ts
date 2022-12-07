import * as types from '../actions/userActions';

interface IAction {
  type: string;
  data?: Array<number>;
}

export interface IUserReducer {
  isFetchingUserLikes: boolean;
  isFetchingUserPromocod: boolean;
  userLikes?: Array<number>;
  userPromocod: string;
  isFetchingLikePost: boolean;
  isFetchingLikeDelete: boolean;
  apiVersion: number;
  language: string;
  deviceLanguage: string;
  sendingFCMToken: boolean;
  userId: number | null;
  dataUserAuthenticated: any;
  platform: string;
}

const initialState: IUserReducer = {
  isFetchingUserLikes: false,
  isFetchingUserPromocod: false,
  userLikes: undefined,
  userPromocod: '',
  isFetchingLikePost: false,
  isFetchingLikeDelete: false,
  apiVersion: 10,
  language: '',
  deviceLanguage: '',
  sendingFCMToken: false,
  userId: null,
  dataUserAuthenticated: [],
  platform: '',
};

const userReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case types.FETCH_USER_LIKES: {
      return {
        ...state,
        isFetchingUserLikes: true,
      };
    }
    case types.SUCCESS_USER_LIKES: {
      return {
        ...state,
        isFetchingUserLikes: false,
        userLikes: action.data,
      };
    }
    case types.FAILURE_USER_LIKES: {
      return {
        ...state,
        isFetchingUserLikes: false,
      };
    }
    case types.FETCH_USER_PROMOCOD: {
      return {
        ...state,
        isFetchingUserPromocod: true,
      };
    }
    case types.SUCCESS_USER_PROMOCOD: {
      return {
        ...state,
        isFetchingUserPromocod: false,
        userPromocod: action.data,
      };
    }
    case types.FAILURE_USER_PROMOCOD: {
      return {
        ...state,
        isFetchingUserPromocod: false,
      };
    }
    case types.SUCCESS_USER_ID: {
      return {
        ...state,
        userId: action.data,
      };
    }
    case types.FETCH_LIKE_POST: {
      return {
        ...state,
        isFetchingLikePost: true,
      };
    }
    case types.SUCCESS_LIKE_POST: {
      return {
        ...state,
        isFetchingLikePost: false,
      };
    }
    case types.FAILURE_LIKE_POST: {
      return {
        ...state,
        isFetchingLikePost: false,
      };
    }
    case types.FETCH_LIKE_DELETE: {
      return {
        ...state,
        isFetchingLikeDelete: true,
      };
    }
    case types.SUCCESS_LIKE_DELETE: {
      return {
        ...state,
        isFetchingLikeDelete: false,
      };
    }
    case types.FAILURE_LIKE_DELETE: {
      return {
        ...state,
        isFetchingLikeDelete: false,
      };
    }
    case types.ADD_LIKE: {
      const likes = state.userLikes!;
      return {...state, userLikes: [...likes, action.data]};
    }
    case types.REMOVE_LIKE: {
      const likes = state.userLikes!;
      return {
        ...state,
        // @ts-ignore
        userLikes: likes.filter(i => i !== action.data),
      };
    }
    case types.GET_API_LANGUAGE: {
      return {
        ...state,
      };
    }
    case types.SET_API_LANGUAGE: {
      return {
        ...state,
        // @ts-ignore
        apiVersion: action?.data?.apiVersion,
        // @ts-ignore
        language: action?.data?.language,
      };
    }
    case types.CLEAR_USER_REDUCER: {
      return {...initialState};
    }
    case types.SET_DEVICE_LANGUAGE: {
      return {...state, deviceLanguage: action?.data};
    }
    case types.SUCCESS_USER_DATA: {
      return {
        ...state,
        dataUserAuthenticated: action.data,
      };
    }
    case types.FETCH_USER_PLATFORM: {
      return {
        ...state,
        platform: action.data,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
