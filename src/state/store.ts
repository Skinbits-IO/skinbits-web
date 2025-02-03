import { configureStore } from '@reduxjs/toolkit';
import amoReducer from './game/amoSlice';
import userSliceReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    amo: amoReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
