import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoostState {
  isActive: boolean;
  type: 'tapboost' | 'fuelboost' | null;
  endTime: number | null;
}

const initialState: BoostState = {
  isActive: false,
  type: null,
  endTime: null,
};

const boostSlice = createSlice({
  name: 'game/boost',
  initialState,
  reducers: {
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
    activateBoost: (
      state,
      action: PayloadAction<{ type: 'tapboost' | 'fuelboost'; endTime: number }>
    ) => {
      state.isActive = true;
      state.type = action.payload.type;
      state.endTime = action.payload.endTime;
    },
    resetBoost: (state) => {
      state.isActive = false;
      state.type = null;
      state.endTime = null;
    },
  },
});

export const { setIsActive, activateBoost, resetBoost } = boostSlice.actions;

export default boostSlice.reducer;
