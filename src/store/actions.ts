import { createAction } from '@reduxjs/toolkit';
import {CardProps} from '../components/offer-card/offer-card-data.ts';


export const setCity = createAction<string>('offers/setCity');
export const setOffers = createAction<CardProps[]>('offers/setOffers');
