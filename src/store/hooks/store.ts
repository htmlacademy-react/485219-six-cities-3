import type {TypedUseSelectorHook} from 'react-redux';
import type {store} from '../index.ts';
import type {AppDispatch, RootState} from '../types/store-types.ts';
import {useDispatch, useSelector, useStore} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore = () => useStore<typeof store>();
