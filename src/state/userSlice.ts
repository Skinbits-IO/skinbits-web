import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface IUserState {
  isLoading: boolean | null;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IUserState = {
  isLoading: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: '/user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean | null>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance += action.payload;
      state.user!.totalEarned += action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance = action.payload;
    },
    setUserRank: (state, action: PayloadAction<string>) => {
      state.user!.rank = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        refreshToken: string | null;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  updateUserBalance,
  setUserBalance,
  setUserRank,
  setTokens,
} = userSlice.actions;

export default userSlice.reducer;
