import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpgradeCard } from '../../types';

const initialState: UpgradeCard[] = [
  {
    title: 'Fuel Amount',
    description:
      'Fuel Amount Fuel Amount Fuel Amount Fuel Amount Fuel Amount Fuel Amount Fuel Amount Fuel Amount',
    photoUrl: '/skinbits-web/upgrades/fuel.jpg',
    price: 500,
    level: 1,
  },
  {
    title: 'Rocket Level',
    description:
      'Rocket Level Rocket Level Rocket Level Rocket Level Rocket Level Rocket Level Rocket Level Rocket Level',
    photoUrl: '/skinbits-web/upgrades/launch.jpg',
    price: 500,
    level: 1,
  },
  {
    title: 'Farming Bot',
    description:
      'Farming Bot Farming Bot Farming Bot Farming Bot Farming Bot Farming Bot Farming Bot Farming Bot',
    photoUrl: '/skinbits-web/upgrades/farm.jpg',
    price: 10000,
    level: 0,
  },
];

const upgradeCardsSlice = createSlice({
  name: 'game/upgrade-cards',
  initialState,
  reducers: {
    addCardLevel: (
      state,
      action: PayloadAction<{ index: number; level: number }>
    ) => {
      state[action.payload.index].level += action.payload.level;
    },
  },
});

export const { addCardLevel } = upgradeCardsSlice.actions;

export default upgradeCardsSlice.reducer;
