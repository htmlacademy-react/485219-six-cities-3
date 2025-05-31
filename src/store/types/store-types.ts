import {CardProps} from '../../components/offer-card/offer-card-data.ts';
import {store} from '../index.ts';

export type OffersState = {
  city: string;
  offers: CardProps[];
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
