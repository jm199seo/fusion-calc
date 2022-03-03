import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import materialsReducer from '../features/materials/materialSlice';
import myStatsReducer from '../features/mystats/mystatSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  whitelist: ['materials', 'myStats'],
};

const reducer = persistReducer(
  persistConfig,
  combineReducers({
    materials: materialsReducer,
    myStats: myStatsReducer,
  })
);

export default reducer;
