import type {TypedUseSelectorHook} from 'react-redux';
import type {store} from '../index.ts';
import type {AppDispatch, RootState} from '../types/store-types.ts';
import {useDispatch, useSelector, useStore} from 'react-redux';

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppStore: () => typeof store = useStore;

export { useAppDispatch, useAppSelector, useAppStore };
