import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User = {
  name: 'Germans',
  surname: 'Prudivus',
  rank: 'bronze',
  tapLevel: 1,
  fuelLevel: 1,
  farmLevel: 0,
  balance: 0,
  photoUrl: null,
};

const userSlice = createSlice({
  name: '/user',
  initialState,
  reducers: {
    setUserData: (_, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUserBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload;
    },
    setUserBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
  },
});

export const { updateUserBalance, setUserBalance } = userSlice.actions;

export default userSlice.reducer;
