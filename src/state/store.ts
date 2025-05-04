import { configureStore } from '@reduxjs/toolkit';
import amoReducer from './game/amoSlice';
import userSliceReducer from './userSlice';
import userGameInfoReducer from './game/userGameInfoSlice';
import boostCardsSliceReducer from './game/boostCardsSlice';
import upgradeCardsSliceReducer from './game/upgradeCardsSlice';

export const store = configureStore({
  reducer: {
    amo: amoReducer,
    user: userSliceReducer,
    userGameInfo: userGameInfoReducer,
    boostCards: boostCardsSliceReducer,
    upgradeCards: upgradeCardsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
