import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './types/store-types.ts';
import {
  setError,
  setOffersDataLoadingStatus,
  redirectToRoute,
  loadOffers
} from './actions';
import { saveToken, removeToken } from '../services/token';
import { APIRoute, AppRoute } from '../components/utils/routes.ts';
import { AuthorizationStatus } from '../components/utils/auth-statuses.ts';
import { TIMEOUT_SHOW_ERROR } from '../components/utils/const.ts';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { store } from './';
import {
  setAuthorizationStatus,
  setUserData,
  clearUserData
} from './user-slice';
import { Review, CommentFormData } from '../types/comment.ts';
import { CardProps } from '../components/offer-card/offer-card-data.ts';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));

    const { data } = await api.get<CardProps[]>(APIRoute.Offers);

    dispatch(setOffersDataLoadingStatus(false));

    dispatch(loadOffers(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      saveToken(data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dispatch(clearUserData());
    }
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      dispatch(redirectToRoute(AppRoute.Main));
      return data;
    } catch (error) {
      dispatch(setError('Failed to login'));
      throw error;
    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(clearUserData());
    dispatch(redirectToRoute(AppRoute.Main));
  }
);

export const postComment = createAsyncThunk<
  Review,
  { offerId: string; commentData: CommentFormData },
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'comments/postComment',
  async ({ offerId, commentData }, { extra: api }) => {
    const { data } = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      commentData
    );
    return data;
  }
);

export const fetchComments = createAsyncThunk<
  Review[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>(
  'comments/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(
      `${APIRoute.Comments}/${offerId}`
    );
    return data;
  }
);
