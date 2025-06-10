import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

const selectAllOffers = (state: RootState) => state.offers.offers;

export const getFavoriteOffers = createSelector(
  [selectAllOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);
