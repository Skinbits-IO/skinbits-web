import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rank, User } from '../../shared';

interface IUserState {
  isLoading: boolean;
  user: User | null;
}

const initialState: IUserState = {
  isLoading: true,
  user: null,
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
  updateUserBalance,
  setUserBalance,
  setUserRank,
} = userSlice.actions;

export default userSlice.reducer;
