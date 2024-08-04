import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import educationReducer from './educationSlice';
import profileReducer from './profileSlice';
import qualificationReducer from './qualificationSlice';
import certificateReducer from './certificateSlice';
import skillReducer from './skillSlice';
import experienceReducer from './experienceSlice';
import extraDetailsReducer from './extraDetailsSlice';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  profileDetails: profileReducer,
  educationDetails: educationReducer,
  experienceDetails: experienceReducer,
  qualificationDetails: qualificationReducer,
  extraDetails: extraDetailsReducer,
  user: userReducer,
  certificateDetails:certificateReducer,
  skillDetails:skillReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
