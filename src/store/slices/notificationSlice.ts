import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../shared';

interface INotificationState {
  show: boolean;
  notifications: Notification[];
}

const initialState: INotificationState = {
  show: false,
  notifications: [],
};

const userSlice = createSlice({
  name: '/notifications',
  initialState,
  reducers: {
    setNotificationShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
  },
});

export const { setNotificationShow, setNotifications } = userSlice.actions;
export default userSlice.reducer;
