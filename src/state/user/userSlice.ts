import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RocketBalanceState {
  value: number;
}

const initialState: RocketBalanceState = {
  value: 0,
};

const rocketBalanceSlice = createSlice({
  name: 'home/wallet/balance',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { updateBalance, setBalance } = rocketBalanceSlice.actions;

export default rocketBalanceSlice.reducer;
