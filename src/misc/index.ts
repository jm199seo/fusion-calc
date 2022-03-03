import {
  BASIC_FUSION_CREATE_COUNT,
  SUPERIOR_FUSION_CREATE_COUNT,
} from '../constants';
import { CreateItem } from '../types/materialTypes';

export const calculateMarketTax = (price: number) => {
  const div = price / 20;
  const remain = price % 20;
  const res = remain === 0 ? div : div + 1;
  return Math.floor(res);
};

export const getCraftCost = (createItemType: CreateItem) => {
  switch (createItemType) {
    case 'basic': {
      return 205;
    }
    case 'superior': {
      return 250;
    }
    default:
      return 0;
  }
};

export const getCraftCostCommissionReduced = (
  craftCost: number,
  commissionReduction: number
) => {
  return Math.floor(craftCost * (100 - commissionReduction) * 0.01);
};

export const calculateSuperior = (
  orehaPrice: number,
  rarePrice: number,
  ancientPrice: number,
  commisionReduction: number
) => {
  let gold = getCraftCost('superior');
  gold = getCraftCostCommissionReduced(gold, commisionReduction);
  gold += (orehaPrice / 10) * 16;
  gold += (rarePrice / 10) * 29;
  gold += (ancientPrice / 100) * 94;
  return gold;
};

export const calculateBasic = (
  orehaPrice: number,
  rarePrice: number,
  ancientPrice: number,
  commisionReduction: number
) => {
  let gold = getCraftCost('basic');
  gold = getCraftCostCommissionReduced(gold, commisionReduction);
  gold += (orehaPrice / 10) * 8;
  gold += (rarePrice / 10) * 26;
  gold += (ancientPrice / 100) * 64;
  return gold;
};

export const createItemToString = (createItemType: CreateItem) => {
  switch (createItemType) {
    case 'basic': {
      return '중급 오레하';
    }
    case 'superior': {
      return '상급 오레하';
    }
    default: {
      return '오레하';
    }
  }
};

export const getCreateCount = (createItemType: CreateItem) => {
  switch (createItemType) {
    case 'basic': {
      return BASIC_FUSION_CREATE_COUNT;
    }
    case 'superior': {
      return SUPERIOR_FUSION_CREATE_COUNT;
    }
    default: {
      return 0;
    }
  }
};
