import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AmoState {
  amo: number;
  maxAmo: number;
}

const initialState: AmoState = {
  amo: 1000,
  maxAmo: 1000,
};

const amoSlice = createSlice({
  name: 'game/amo',
  initialState,
  reducers: {
    addAmo: (state, action: PayloadAction<number>) => {
      state.amo += action.payload;
    },
    reduceAmo: (state, action: PayloadAction<number>) => {
      state.amo -= action.payload;
    },
    setAmo: (state, action: PayloadAction<number>) => {
      state.amo = action.payload;
    },
    setMaxAmo: (state, action: PayloadAction<number>) => {
      state.maxAmo = action.payload;
    },
  },
});

export const { addAmo, reduceAmo, setAmo, setMaxAmo } = amoSlice.actions;

export default amoSlice.reducer;
