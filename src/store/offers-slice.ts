import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES } from '../components/utils/const.ts';
import { cardsData } from '../components/offer-card/offer-card-data.ts';
import {CardProps} from '../components/offer-card/offer-card-data.ts';

type OffersState = {
  city: string;
  offers: CardProps[];
};

const initialState: OffersState = {
  city: CITIES[3],
  offers: cardsData,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setOffers: (state, action: PayloadAction<CardProps[]>) => {
      state.offers = action.payload;
    },
  },
});

export const { setCity, setOffers } = offersSlice.actions;
export const offersReducer = offersSlice.reducer;
