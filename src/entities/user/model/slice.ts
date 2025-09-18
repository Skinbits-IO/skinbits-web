import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { RankEnum } from '../../../shared';
import { Subscription } from '../../subscription';

interface IUserState {
  isLoading: boolean;
  user: User | null;
  tokens: {
    tapToken: string | null;
    wsToken: string;
  } | null;
  subscription: Subscription | null;
}

const initialState: IUserState = {
  isLoading: true,
  user: null,
  tokens: null,
  subscription: null,
};

const userSlice = createSlice({
  name: '/user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWsToken: (state, action: PayloadAction<string | null>) => {
      if (state.tokens && action.payload) {
        state.tokens.wsToken = action.payload;
      } else if (!state.tokens && action.payload) {
        state.tokens = { tapToken: null, wsToken: action.payload };
      } else {
        state.tokens = null;
      }
    },
    setTapToken: (state, action: PayloadAction<string | null>) => {
      if (state.tokens) state.tokens.tapToken = action.payload;
    },
    setUserSubscription: (
      state,
      action: PayloadAction<Subscription | null>,
    ) => {
      state.subscription = action.payload;
    },
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance += action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance = action.payload;
    },
    setUserRank: (state, action: PayloadAction<RankEnum>) => {
      state.user!.rank = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  setWsToken,
  setTapToken,
  setUserSubscription,
  updateUserBalance,
  setUserBalance,
  setUserRank,
} = userSlice.actions;

export default userSlice.reducer;
