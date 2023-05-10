import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import { api } from './api/api';

export const store = configureStore({
  reducer: {
    auth,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
