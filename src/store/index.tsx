import {configureStore} from '@reduxjs/toolkit';
import messageReducer from './slicers';
import favoritesReducer from './slicers/favorites';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {ArtWork} from '../hooks/types';
import {combineReducers} from 'redux';

export interface RootState {
  message: string;
  favorites: {artworks: ArtWork[]};
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducers = combineReducers({
  message: messageReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);