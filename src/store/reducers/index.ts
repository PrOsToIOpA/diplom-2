import {applyMiddleware, combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

import signingReducer, {ISigningReducer} from './signingReducer';
import authReducer, {IAuthReducer} from './authReducer';
import programsReducer, {IProgramsReducer} from './programsReducer';
import userReducer, {IUserReducer} from './userReducer';

export interface IRootReducer {
  signingReducer: ISigningReducer;
  authReducer: IAuthReducer;
  programsReducer: IProgramsReducer;
  userReducer: IUserReducer;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'programsReducer', 'userReducer'],
};

const rootReducer = combineReducers({
  signingReducer,
  authReducer,
  programsReducer,
  userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedRootReducer = (state: any, action: any) => {
  return persistedReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

export const store = createStore(
  persistedRootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {store, persistor};
