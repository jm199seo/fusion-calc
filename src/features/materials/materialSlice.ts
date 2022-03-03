import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { createItemToString } from '../../misc';
import { CreateItem } from '../../types/materialTypes';

interface MaterialState {
  ancient: number; // per 100
  rare: number; // per 10
  oreha: number; // per 10
  itemType: CreateItem;
}

const initialState: MaterialState = {
  ancient: 0,
  rare: 0,
  oreha: 0,
  itemType: 'superior',
};

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    changeAncient: (state, action: PayloadAction<number>) => {
      // const ancientPrice = action.payload / 100;
      const ancientPrice = action.payload;
      state.ancient = ancientPrice;
    },
    changeRare: (state, action: PayloadAction<number>) => {
      // const rarePrice = action.payload / 10;
      const rarePrice = action.payload;
      state.rare = rarePrice;
    },
    changeOreha: (state, action: PayloadAction<number>) => {
      // const orehaPrice = action.payload / 10;
      const orehaPrice = action.payload;
      state.oreha = orehaPrice;
    },
    changeItemType: (state, action: PayloadAction<CreateItem>) => {
      state.itemType = action.payload;
    },
  },
});

export const { changeAncient, changeRare, changeOreha, changeItemType } =
  materialSlice.actions;

export const selectAncient = (state: RootState) => state.materials.ancient;
export const selectRare = (state: RootState) => state.materials.rare;
export const selectOreha = (state: RootState) => state.materials.oreha;
export const selectItemType = (state: RootState) => state.materials.itemType;
export const selectItemTypeString = (state: RootState) => {
  const itemType = state.materials.itemType;
  return createItemToString(itemType);
};

export default materialSlice.reducer;
