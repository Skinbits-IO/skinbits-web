import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rank, User, UserSubscription } from '../../shared';

interface IUserState {
  isLoading: boolean;
  user: User | null;
  subscription: UserSubscription | null;
}

const initialState: IUserState = {
  isLoading: true,
  user: null,
  subscription: null,
};

const userSlice = createSlice({
  name: '/user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUserSubscription: (
      state,
      action: PayloadAction<UserSubscription | null>
    ) => {
      state.subscription = action.payload;
    },
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance += action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number>) => {
      state.user!.balance = action.payload;
    },
    setUserRank: (state, action: PayloadAction<Rank>) => {
      state.user!.rank = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  setUserSubscription,
  updateUserBalance,
  setUserBalance,
  setUserRank,
} = userSlice.actions;

export default userSlice.reducer;
