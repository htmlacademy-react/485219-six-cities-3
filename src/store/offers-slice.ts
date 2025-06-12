import {createAction, createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CITIES} from '../components/utils/const.ts';
import {AuthorizationStatus} from '../components/utils/auth-statuses.ts';
import {api} from '../services/api';
import type {CardProps} from '../components/offer-card/offer-card-data.ts';
import {loginAction, toggleFavoriteAction} from './api-actions.ts';

const START_CITY = 3;

type ServerOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  description: string;
  images: string[];
};

const adaptOfferToClient = (offer: ServerOffer): CardProps => ({
  id: offer.id,
  img: offer.previewImage,
  isPremium: offer.isPremium,
  price: offer.price,
  rating: offer.rating,
  cardTitle: offer.title,
  cardType: offer.type,
  city: offer.city,
  location: offer.location,
  isFavorite: offer.isFavorite,
  bedrooms: offer.bedrooms,
  maxAdults: offer.maxAdults,
  goods: offer.goods,
  host: offer.host,
  description: offer.description,
  images: offer.images
});

type OffersState = {
  city: string;
  offers: CardProps[];
  nearbyOffers: CardProps[];
  currentOffer: CardProps | null;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  isCurrentOfferLoading: boolean;
  error: string | null;
  email: string | null;
  currentOfferError: string | null;
};

const initialState: OffersState = {
  city: CITIES[START_CITY],
  offers: [],
  nearbyOffers: [],
  currentOffer: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  isCurrentOfferLoading: false,
  error: null,
  email: null,
  currentOfferError: null,
};

export const fetchOffers = createAsyncThunk<CardProps[], void>(
  'offers/fetchOffers',
  async (_, {rejectWithValue}) => {
    try {
      const {data} = await api.get<ServerOffer[]>('/offers');
      return data.map(adaptOfferToClient);
    } catch (error) {
      return rejectWithValue('Failed to load offers');
    }
  }
);

export const fetchOfferById = createAsyncThunk<CardProps, string>(
  'offers/fetchOfferById',
  async (offerId, {rejectWithValue}) => {
    try {
      const {data} = await api.get<ServerOffer>(`/offers/${offerId}`);
      return adaptOfferToClient(data);
    } catch (error) {
      return rejectWithValue('Failed to load offer');
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<CardProps[], string>(
  'offers/fetchNearbyOffers',
  async (offerId, {rejectWithValue}) => {
    try {
      const {data} = await api.get<ServerOffer[]>(`/offers/${offerId}/nearby`);
      return data.map(adaptOfferToClient);
    } catch (error) {
      return rejectWithValue('Failed to load nearby offers');
    }
  }
);

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    updateOffer: (state, action: PayloadAction<CardProps>) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index] = action.payload;
      }
      if (state.currentOffer?.id === action.payload.id) {
        state.currentOffer = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrentOffer: (state) => {
      state.currentOffer = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isOffersDataLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.isCurrentOfferLoading = true;
        state.error = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isCurrentOfferLoading = false;
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.isCurrentOfferLoading = false;
        state.currentOfferError = action.payload as string;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.email = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const {id, isFavorite} = action.payload; // Получаем только id и статус

        state.offers.forEach((offer) => {
          if (offer.id === id) {
            offer.isFavorite = isFavorite;
          }
        });

        if (state.currentOffer?.id === id) {
          state.currentOffer.isFavorite = isFavorite;
        }

        state.nearbyOffers.forEach((offer) => {
          if (offer.id === id) {
            offer.isFavorite = isFavorite;
          }
        });
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export const {
  setCity,
  updateOffer,
  setError,
  clearCurrentOffer
} = offersSlice.actions;

export const offersReducer = offersSlice.reducer;
export const redirectToRoute = createAction<string>('app/redirectToRoute');
