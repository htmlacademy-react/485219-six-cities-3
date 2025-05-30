
import { createReducer } from '@reduxjs/toolkit';
import {CITIES} from '../components/utils/const.ts';
import {cardsData} from '../components/offer-card/offer-card-data.ts';
import {OffersState} from './types/store-types.ts';
import {setCity, setOffers} from './actions.ts';

const initialState: OffersState = {
  city: CITIES[3],
  offers: cardsData,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export { reducer };
