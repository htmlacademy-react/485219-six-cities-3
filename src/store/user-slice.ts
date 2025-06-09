import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../components/utils/auth-statuses.ts';

type UserData = {
  email: string;
  name: string;
  avatarUrl: string;
  isPro?: boolean;
};

type UserState = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
  },
});

export const {
  setAuthorizationStatus,
  setUserData,
  clearUserData
} = userSlice.actions;

export const userReducer = userSlice.reducer;
