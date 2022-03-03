import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAncient,
  selectItemType,
  selectItemTypeString,
  selectOreha,
  selectRare,
} from '../features/materials/materialSlice';
import {
  changeDesiredSellPrice,
  selectCommisionReductionPercentage,
  selectCreateQuantity,
  selectDesiredSellPrice,
} from '../features/mystats/mystatSlice';
import { calculateBasic, calculateSuperior, getCreateCount } from '../misc';
import ShowTotalResults from './ShowTotalResults';

const ShowCalculatedResults: React.FC = () => {
  const dispatch = useAppDispatch();
  const orehaPrice = useAppSelector(selectOreha);
  const rarePrice = useAppSelector(selectRare);
  const ancientPrice = useAppSelector(selectAncient);
  const commissionReduction = useAppSelector(
    selectCommisionReductionPercentage
  );

  const currentItemType = useAppSelector(selectItemType);
  const desiredSellPrice = useAppSelector(
    selectDesiredSellPrice(currentItemType)
  );
  const createQuantity = useAppSelector(selectCreateQuantity(currentItemType));
  const createBaseCount = getCreateCount(currentItemType);

  // const myCreatePrice = calculateSuperior(
  //   orehaPrice,
  //   rarePrice,
  //   ancientPrice,
  //   commissionReduction
  // );

  const myCreatePrice = useMemo(() => {
    if (currentItemType === 'basic') {
      return calculateBasic(
        orehaPrice,
        rarePrice,
        ancientPrice,
        commissionReduction
      );
    }
    if (currentItemType === 'superior') {
      return calculateSuperior(
        orehaPrice,
        rarePrice,
        ancientPrice,
        commissionReduction
      );
    }
    return 0;
  }, [
    ancientPrice,
    commissionReduction,
    currentItemType,
    orehaPrice,
    rarePrice,
  ]);

  const itemTitle = useAppSelector(selectItemTypeString);

  return (
    <div className='flex flex-col gap-8'>
      <span className='text-2xl '>계산</span>
      <span className='text-lg font-bold '>제작</span>
      <div className='flex gap-12 align-middle'>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
            <span>
              제작한 {<u>{itemTitle}</u>} {createQuantity}개 가격 :{' '}
              <strong>
                {((myCreatePrice * createQuantity) / createBaseCount).toFixed(
                  2
                )}
                골드
              </strong>
            </span>
            <span>
              제작한 {<u>{itemTitle}</u>} 한덩이 ({createBaseCount}개) 제작 비용
              : <strong>{myCreatePrice.toFixed(2)} 골드</strong>
            </span>
            <span>
              제작한 {<u>{itemTitle}</u>} 1개 가격 :{' '}
              <strong>
                {(myCreatePrice / createBaseCount).toFixed(2)}골드
              </strong>
            </span>
          </div>
        </div>
        <div className='flex flex-row align-middle justify-between border'>
          <span className='text-center my-auto flex justify-center mx-auto px-4'>
            거래소 희망가
          </span>
          <input
            className='border-2 text-right'
            type='number'
            min={0}
            max={100}
            step={1}
            value={desiredSellPrice}
            onChange={(e) => {
              const val = Number(e.target.value);
              // setSellPrice(val);
              dispatch(
                changeDesiredSellPrice({
                  type: currentItemType,
                  sellPrice: val,
                })
              );
            }}
          />
        </div>
      </div>
      <ShowTotalResults
        sellPrice={desiredSellPrice}
        createPrice={myCreatePrice / createBaseCount}
        numResultsToShow={5}
      />
    </div>
  );
};

export default ShowCalculatedResults;
