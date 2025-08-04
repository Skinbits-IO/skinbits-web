import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FarmingSession, FarmStatus } from '../../../shared';

interface FarmState {
  status: FarmStatus;
  session: FarmingSession | null;
  fetched: boolean;
}

const initialState: FarmState = {
  status: FarmStatus.Buy,
  session: null,
  fetched: false,
};

const farmSlice = createSlice({
  name: 'game/farm',
  initialState,
  reducers: {
    setFarmingStatus: (state, action: PayloadAction<FarmStatus>) => {
      state.status = action.payload;
    },
    setFarmingSession: (
      state,
      action: PayloadAction<FarmingSession | null>
    ) => {
      state.session = action.payload;
    },
    setFarmFetched: (state, action: PayloadAction<boolean>) => {
      state.fetched = action.payload;
    },
  },
});

export const { setFarmingStatus, setFarmingSession, setFarmFetched } =
  farmSlice.actions;

export default farmSlice.reducer;
