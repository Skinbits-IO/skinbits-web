import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameSession } from '../../types';

interface GameSessionState {
  gameSession: Omit<GameSession, 'endTime'>;
}

const initialState: GameSessionState = {
  gameSession: {
    startTime: null,
    totalTaps: 0,
    balanceEarned: 0,
    boostsUsed: 0,
  },
};

const gameSessionSlice = createSlice({
  name: 'game/game-session',
  initialState,
  reducers: {
    setStartTime: (state, action: PayloadAction<string>) => {
      state.gameSession.startTime = action.payload;
    },
    updateTotalTaps: (state, action: PayloadAction<number>) => {
      state.gameSession.totalTaps += action.payload;
    },
    updateBalanceEarned: (state, action: PayloadAction<number>) => {
      state.gameSession.balanceEarned += action.payload;
    },
    updateBoostsUsed: (state, action: PayloadAction<number>) => {
      state.gameSession.boostsUsed += action.payload;
    },
    resetGameSession: (state) => {
      state.gameSession.startTime = null;
      state.gameSession.totalTaps = 0;
      state.gameSession.balanceEarned = 0;
      state.gameSession.boostsUsed = 0;
    },
  },
});

export const {
  setStartTime,
  updateTotalTaps,
  updateBalanceEarned,
  updateBoostsUsed,
  resetGameSession,
} = gameSessionSlice.actions;

export default gameSessionSlice.reducer;
