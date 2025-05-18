import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserGameInfo } from '../../../shared';

interface UserGameInfoState {
  user: UserGameInfo | null;
}

const initialState: UserGameInfoState = {
  user: null,
};

const userGameInfoSlice = createSlice({
  name: 'game/user-game-info',
  initialState,
  reducers: {
    setUserGameInfo: (state, action: PayloadAction<UserGameInfo>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserGameInfo } = userGameInfoSlice.actions;

export default userGameInfoSlice.reducer;
