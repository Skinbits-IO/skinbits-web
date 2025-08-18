import { configureStore } from '@reduxjs/toolkit';
import { gameSessionReducer, userReducer } from '../entities';
import { boostReducer, farmReducer } from '../features';
import { notificationReducer, searchReducer } from '../widgets';
import { statusNotificationsReducer } from '../shared';

export const store = configureStore({
  reducer: {
    user: userReducer,
    boost: boostReducer,
    farm: farmReducer,
    gameSession: gameSessionReducer,
    notification: notificationReducer,
    statusNotifications: statusNotificationsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
