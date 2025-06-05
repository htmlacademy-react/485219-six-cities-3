import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from './offers-slice';
import { createAPI } from '../services/api.ts';
import { redirect } from './middlewares/redirect';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: offersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
