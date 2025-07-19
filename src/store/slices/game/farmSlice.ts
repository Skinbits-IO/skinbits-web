import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FarmingSession, FarmStatus } from '../../../shared';

interface FarmState {
  status: FarmStatus;
  session: FarmingSession | null;
}

const initialState: FarmState = {
  status: FarmStatus.Buy,
  session: null,
};

const farmSlice = createSlice({
  name: 'game/farm',
  initialState,
  reducers: {
    setFarmingStatus: (state, action: PayloadAction<FarmStatus>) => {
      state.status = action.payload;
    },
    setFarmingSession: (state, action: PayloadAction<FarmingSession>) => {
      state.session = action.payload;
    },
  },
});

export const { setFarmingStatus, setFarmingSession } = farmSlice.actions;

export default farmSlice.reducer;
