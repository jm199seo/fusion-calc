import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  changeAncient,
  changeOreha,
  changeRare,
  selectAncient,
  selectOreha,
  selectRare,
} from '../features/materials/materialSlice';
import type { Material, MaterialNames } from '../types/materialTypes';

interface IPriceInput {
  materialName: MaterialNames;
  materialKorName: string;
  materialValue: number;
  maxPrice: number;
  minPrice: number;
  onInputChange: (type: MaterialNames, price: number) => void;
}
const PriceInput: React.FC<IPriceInput> = ({
  materialName,
  materialKorName,
  materialValue,
  maxPrice,
  minPrice = 0,
  onInputChange,
}) => {
  return (
    <div className='flex align-middle justify-between gap-6'>
      <label htmlFor={materialName}>{materialKorName}</label>
      <input
        className='border-2 w-20 text-right'
        type='number'
        max={maxPrice}
        min={minPrice}
        step={1}
        name={materialName}
        value={materialValue}
        onChange={(e) => {
          const val = Number(e.target.value);
          onInputChange(materialName, val);
        }}
      />
    </div>
  );
};

const materialList: Material[] = [
  {
    name: 'ancient',
    korName: '고대 유물 (100개 가격)',
    minPrice: 0,
    maxPrice: 300,
    quantity: 100,
  },
  {
    name: 'rare',
    korName: '희귀한 유물 (10개 가격)',
    minPrice: 0,
    maxPrice: 40,
    quantity: 10,
  },
  {
    name: 'oreha',
    korName: '오레하 유물 (10개 가격)',
    minPrice: 0,
    maxPrice: 50,
    quantity: 10,
  },
];

const MaterialPriceInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const ancientVal = useAppSelector(selectAncient);
  const rareVal = useAppSelector(selectRare);
  const orehaVal = useAppSelector(selectOreha);

  const getMaterialValue = useCallback(
    (materialType: MaterialNames) => {
      switch (materialType) {
        case 'ancient': {
          return ancientVal ?? 0;
        }
        case 'rare': {
          return rareVal ?? 0;
        }
        case 'oreha': {
          return orehaVal ?? 0;
        }
        default:
          return 0;
      }
    },
    [ancientVal, orehaVal, rareVal]
  );

  const onInputChange = useCallback(
    (materialType: MaterialNames, price: number) => {
      switch (materialType) {
        case 'ancient': {
          dispatch(changeAncient(price));
          break;
        }
        case 'rare': {
          dispatch(changeRare(price));
          break;
        }
        case 'oreha': {
          dispatch(changeOreha(price));
          break;
        }
      }
    },
    [dispatch]
  );

  return (
    <div className='flex flex-col gap-2 border-4 border-green-300 p-8 shadow-md justify-center gap-y-6'>
      {materialList.map((ml) => (
        <PriceInput
          key={ml.name}
          materialName={ml.name}
          materialKorName={ml.korName}
          maxPrice={ml.maxPrice}
          minPrice={ml.minPrice}
          materialValue={getMaterialValue(ml.name)}
          onInputChange={onInputChange}
        />
      ))}
    </div>
  );
};

export default MaterialPriceInput;
