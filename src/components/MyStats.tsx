import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectItemType } from '../features/materials/materialSlice';
import {
  changeCommision,
  changeCreateQuantity,
  selectCommisionReductionPercentage,
  selectCreateQuantity,
} from '../features/mystats/mystatSlice';
import {
  getCraftCost,
  getCraftCostCommissionReduced,
  getCreateCount,
} from '../misc';

const MyStats: React.FC = () => {
  const dispatch = useAppDispatch();

  const commissionVal = useAppSelector(selectCommisionReductionPercentage);
  const currentItemType = useAppSelector(selectItemType);
  const userCreateQuantity = useAppSelector(
    selectCreateQuantity(currentItemType)
  );
  const createBaseCount = getCreateCount(currentItemType);

  const onQuantityChange = useCallback(
    (val: number) => {
      dispatch(
        changeCreateQuantity({
          type: currentItemType,
          quantity: val,
        })
      );
    },
    [currentItemType, dispatch]
  );
  const onCommissionChange = useCallback(
    (val: number) => {
      dispatch(changeCommision(val));
    },
    [dispatch]
  );

  return (
    <div className='flex flex-col gap-2 border-4 border-green-300 p-8 justify-center align-middle'>
      <label htmlFor='createQuantity'>제작 개수</label>
      <input
        type='number'
        className='border'
        name='createQuantity'
        min={createBaseCount}
        max={1200}
        step={createBaseCount}
        value={userCreateQuantity}
        onChange={(e) => {
          const val = Number(e.target.value);
          // if (val > Number(e.target.max) || val < Number(e.target.min)) {
          //   return;
          // }
          onQuantityChange(val);
        }}
        onBlur={(e) => {
          const val = Number(e.target.value);
          if (val % createBaseCount !== 0) {
            const newQuantity = val - (val % createBaseCount);
            if (newQuantity > Number(e.target.max)) {
              onQuantityChange(Number(e.target.max));
            } else if (newQuantity < Number(e.target.min)) {
              onQuantityChange(Number(e.target.min));
            } else {
              onQuantityChange(newQuantity);
            }
          }
        }}
      />
      <label htmlFor='commission'>제작 수수료 절감 %</label>
      <input
        type='number'
        className='border'
        name='commission'
        min={0}
        max={50}
        step={0.5}
        value={commissionVal}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val > Number(e.target.max) || val < Number(e.target.min)) {
            return;
          }
          onCommissionChange(val);
        }}
      />
      <span>제작 비용</span>
      <span>
        {getCraftCostCommissionReduced(
          getCraftCost(currentItemType),
          commissionVal
        )}{' '}
      </span>
    </div>
  );
};

export default MyStats;
