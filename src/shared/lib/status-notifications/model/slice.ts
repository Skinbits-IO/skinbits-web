import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatusNotification {
  id: number;
  text: string;
  duration: number;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface IInitialState {
  notifications: StatusNotification[];
}

const initialState: IInitialState = {
  notifications: [],
};

const statusNotificationsSlice = createSlice({
  name: '/status-notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<StatusNotification>) => {
      const { text, duration, type } = action.payload;
      const newNotification: StatusNotification = {
        id: Date.now(),
        text,
        duration,
        type,
      };
      state.notifications.push(newNotification);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  statusNotificationsSlice.actions;
export default statusNotificationsSlice.reducer;
