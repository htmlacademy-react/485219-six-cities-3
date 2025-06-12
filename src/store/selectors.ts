import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import {AuthorizationStatus} from '../components/utils/auth-statuses.ts';

const selectAllOffers = (state: RootState) => state.offers.offers;

export const getFavoriteOffers = createSelector(
  [selectAllOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getAuthorizationStatus = (state: RootState): AuthorizationStatus =>
  state.user.authorizationStatus;
