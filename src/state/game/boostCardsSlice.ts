import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoostCard } from '../../types';

const initialState: BoostCard[] = [
  {
    title: 'Fuel boost',
    description:
      'Fuel boost Fuel boost Fuel boost Fuel boost Fuel boost Fuel boost Fuel boost Fuel boost Fuel boost',
    photoUrl: '/skinbits-web/upgrades/fuel-boost.jpg',
    price: 100000,
    amount: 0,
  },
  {
    title: 'Rocket boost',
    description:
      'Rocket boost Rocket boost Rocket boost Rocket boost Rocket boost Rocket boost Rocket boost Rocket boost',
    photoUrl: '/skinbits-web/upgrades/launch-boost.jpg',
    price: 100000,
    amount: 0,
  },
];

const boostCardsSlice = createSlice({
  name: 'game/boost-cards',
  initialState,
  reducers: {
    addCardAmount: (
      state,
      action: PayloadAction<{ index: number; amount: number }>
    ) => {
      state[action.payload.index].amount += action.payload.amount;
    },
  },
});

export const { addCardAmount } = boostCardsSlice.actions;

export default boostCardsSlice.reducer;
