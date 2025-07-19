import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userSlice';
import amoReducer from './slices/game/amoSlice';
import boostReducer from './slices/game/boostSlice';
import farmReducer from './slices/game/farmSlice';
import userGameInfoReducer from './slices/game/userGameInfoSlice';
import gameSessionReducer from './slices/game/gameSessionSlice';
import notificationReducer from './slices/notificationSlice';
import statusNotificationsReducer from './slices/statusNotificationSlice';
import searchReducer from './slices/marketplace/searchSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    amo: amoReducer,
    boost: boostReducer,
    farm: farmReducer,
    userGameInfo: userGameInfoReducer,
    gameSession: gameSessionReducer,
    notification: notificationReducer,
    statusNotifications: statusNotificationsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
