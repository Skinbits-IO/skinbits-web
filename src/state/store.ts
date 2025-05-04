import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import amoReducer from './game/amoSlice';
import userGameInfoReducer from './game/userGameInfoSlice';
import gameSessionReducer from './game/gameSessionSlice';
import boostCardsSliceReducer from './game/boostCardsSlice';
import upgradeCardsSliceReducer from './game/upgradeCardsSlice';
import statusNotificationsReducer from './statusNotificationSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    amo: amoReducer,
    userGameInfo: userGameInfoReducer,
    gameSession: gameSessionReducer,
    boostCards: boostCardsSliceReducer,
    upgradeCards: upgradeCardsSliceReducer,
    statusNotifications: statusNotificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
