import { RootState } from './index';

export const getFavoriteOffers = (state: RootState) =>
  state.offers.offers.filter((offer) => offer.isFavorite);
