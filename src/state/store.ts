import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import amoReducer from './game/amoSlice';
import userGameInfoReducer from './game/userGameInfoSlice';
import gameSessionReducer from './game/gameSessionSlice';
import statusNotificationsReducer from './statusNotificationSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    amo: amoReducer,
    userGameInfo: userGameInfoReducer,
    gameSession: gameSessionReducer,
    statusNotifications: statusNotificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
