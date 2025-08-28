import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeaponTypes } from '../types';

interface SearchState {
  query: string;
  weaponTypes: WeaponTypes[];
  rarities: 'asc' | 'desc';
  qualities: 'asc' | 'desc';
  priceRange: { from: number; to?: number };
}

const initialState: SearchState = {
  query: '',
  weaponTypes: [],
  rarities: 'desc',
  qualities: 'desc',
  priceRange: { from: 0 },
};

const searchSlice = createSlice({
  name: '/marketplace/search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    addWeaponType: (state, action: PayloadAction<WeaponTypes>) => {
      state.weaponTypes.push(action.payload);
    },
    removeWeaponType: (state, action: PayloadAction<WeaponTypes>) => {
      state.weaponTypes = state.weaponTypes.filter(
        (type) => type !== action.payload
      );
    },
    setRaritiesFilter: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.rarities = action.payload;
    },
    setQualitiesFilter: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.qualities = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ from: number; to?: number }>
    ) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.weaponTypes = [];
      state.rarities = 'desc';
      state.qualities = 'desc';
    },
  },
});

export const {
  setSearchQuery,
  addWeaponType,
  removeWeaponType,
  setRaritiesFilter,
  setQualitiesFilter,
  setPriceRange,
  resetFilters,
} = searchSlice.actions;

export default searchSlice.reducer;
