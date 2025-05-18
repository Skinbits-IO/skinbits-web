import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotificationState {
  show: boolean;
}

const initialState: INotificationState = {
  show: false,
};

const userSlice = createSlice({
  name: '/user',
  initialState,
  reducers: {
    setNotificationShow: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const { setNotificationShow } = userSlice.actions;
export default userSlice.reducer;
