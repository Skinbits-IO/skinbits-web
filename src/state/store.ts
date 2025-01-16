import { configureStore } from '@reduxjs/toolkit';
import amoReducer from './game/amoSlice';
import rocketBalanceReducer from './home/balanceSlice';

export const store = configureStore({
  reducer: {
    amo: amoReducer,
    rocketBalance: rocketBalanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
