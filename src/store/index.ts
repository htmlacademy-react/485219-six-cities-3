import {configureStore} from '@reduxjs/toolkit';
import {offersReducer} from './offers-slice';
import {RootState, AppDispatch} from './types/store-types.ts';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

export const store = configureStore({
  reducer: {
    offers: offersReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
