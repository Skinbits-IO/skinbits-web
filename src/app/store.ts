import { configureStore } from '@reduxjs/toolkit';
import { boostReducer, userReducer } from '../entities';
import { farmReducer } from '../features';
import { notificationReducer, searchReducer } from '../widgets';
import { statusNotificationsReducer } from '../shared';

export const store = configureStore({
  reducer: {
    user: userReducer,
    boost: boostReducer,
    farm: farmReducer,
    notification: notificationReducer,
    statusNotifications: statusNotificationsReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
