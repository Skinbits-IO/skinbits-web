import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AmoState {
  value: number;
  max: number;
}

const initialState: AmoState = {
  value: 10,
  max: 10,
};

const amoSlice = createSlice({
  name: 'game/amo',
  initialState,
  reducers: {
    addAmo: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reduceAmo: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    setAmo: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    setMaxAmo: (state, action: PayloadAction<number>) => {
      state.max = action.payload;
    },
  },
});

export const { addAmo, reduceAmo, setAmo, setMaxAmo } = amoSlice.actions;

export default amoSlice.reducer;
