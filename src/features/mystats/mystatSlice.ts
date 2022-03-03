import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { CreateItem } from '../../types/materialTypes';

interface MyStatState {
  commisionReductionPercentage: number;
  quantity: {
    basic: number;
    superior: number;
  };
  sellPrice: {
    basic: number;
    superior: number;
  };
}

const initialState: MyStatState = {
  commisionReductionPercentage: 0,
  quantity: {
    basic: 30,
    superior: 20,
  },
  sellPrice: {
    basic: 10,
    superior: 20,
  },
};

export const myStatSlice = createSlice({
  name: 'mystat',
  initialState,
  reducers: {
    changeCommision: (state, action: PayloadAction<number>) => {
      const commission = action.payload;
      if (commission >= 0 && commission <= 50) {
        state.commisionReductionPercentage = commission;
      }
    },
    changeCreateQuantity: (
      state,
      action: PayloadAction<{
        type: CreateItem;
        quantity: number;
      }>
    ) => {
      const { type, quantity } = action.payload;
      if (quantity >= 0 && quantity <= 1200) {
        if (type === 'basic') {
          state.quantity.basic = quantity;
        } else if (type === 'superior') {
          state.quantity.superior = quantity;
        }
      }
    },
    changeDesiredSellPrice: (
      state,
      action: PayloadAction<{ type: CreateItem; sellPrice: number }>
    ) => {
      const { type, sellPrice } = action.payload;
      if (type === 'basic') {
        state.sellPrice.basic = sellPrice;
      } else if (type === 'superior') {
        state.sellPrice.superior = sellPrice;
      }
    },
  },
});

export const { changeCommision, changeCreateQuantity, changeDesiredSellPrice } =
  myStatSlice.actions;

export const selectCommisionReductionPercentage = (state: RootState) =>
  state.myStats.commisionReductionPercentage;

export const selectCreateQuantity =
  (itemType: CreateItem) => (state: RootState) => {
    if (state.myStats.quantity === undefined) {
      state.myStats.quantity = initialState.quantity;
    }

    return state.myStats.quantity[itemType];
  };

export const selectDesiredSellPrice =
  (itemType: CreateItem) => (state: RootState) => {
    if (state.myStats.sellPrice === undefined) {
      state.myStats.sellPrice = initialState.sellPrice;
    }
    return state.myStats.sellPrice[itemType];
  };

export default myStatSlice.reducer;
