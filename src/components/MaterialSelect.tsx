import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  changeItemType,
  selectItemType,
} from '../features/materials/materialSlice';

const MaterialSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentItemType = useAppSelector(selectItemType);

  return (
    <div className='mx-auto flex flex-row border h-full w-auto rounded-lg my-auto'>
      <div
        onClick={() => {
          dispatch(changeItemType('basic'));
        }}
        className={clsx(
          currentItemType === 'basic' ? 'bg-red-50' : 'bg-white',
          currentItemType === 'basic' ? 'font-bold' : 'font-normal',
          'flex justify-center mx-auto align-middle hover:cursor-pointer'
        )}
      >
        <span className='text-center align-middle my-auto p-4'>중급오레하</span>
      </div>
      <div
        onClick={() => {
          dispatch(changeItemType('superior'));
        }}
        className={clsx(
          currentItemType === 'superior' ? 'bg-red-50' : 'bg-white',
          currentItemType === 'superior' ? 'font-bold' : 'font-normal',
          'flex justify-center mx-auto align-middle hover:cursor-pointer'
        )}
      >
        <span className='text-center align-middle my-auto p-4'>상급오레하</span>
      </div>
    </div>
  );
};

export default MaterialSelect;
