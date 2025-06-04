import { createAction } from '@reduxjs/toolkit';
import {CardProps} from '../components/offer-card/offer-card-data.ts';
import {AuthorizationStatus} from '../components/utils/auth-statuses.ts';
import {AppRoute} from '../components/utils/routes.ts';


export const setCity = createAction<string>('app/setCity');
export const initOffers = createAction<CardProps[]>('app/initOffers');
export const loadOffers = createAction<CardProps[]>('data/loadOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setError = createAction<string | null>('app/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
export const setUserEmail = createAction<string>('user/setUserEmail');
