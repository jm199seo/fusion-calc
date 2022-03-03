import clsx from 'clsx';
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { useAppSelector } from '../app/hooks';
import { selectItemType } from '../features/materials/materialSlice';
import { selectCreateQuantity } from '../features/mystats/mystatSlice';
import { calculateMarketTax } from '../misc';

interface IShowTotalResults {
  sellPrice: number;
  createPrice: number;
  numResultsToShow: number;
}

interface ResultTableType {
  sellPrice: number;
  tax: number;
  profit: string;
}

const ShowTotalResults: React.FC<IShowTotalResults> = ({
  sellPrice,
  createPrice,
  numResultsToShow,
}) => {
  const itemType = useAppSelector(selectItemType);
  const createQuantity = useAppSelector(selectCreateQuantity(itemType));

  // const neighborSellPriceArray = useMemo(() => {
  //   // if (numResultsToShow === 1) {
  //   //   return [sellPrice];
  //   // }
  //   const arr = new Array(numResultsToShow)
  //     .fill(Math.floor(sellPrice - numResultsToShow / 2 + 1))
  //     .map((a, idx) => (a += idx))
  //     .filter((v) => v > 0);
  //   return arr;
  // }, [numResultsToShow, sellPrice]);
  const dataArray = useMemo(() => {
    // const arr = [];
    const neighborSellPriceArray = new Array(numResultsToShow)
      .fill(Math.floor(sellPrice - numResultsToShow / 2 + 1))
      .map((a, idx) => (a += idx))
      .filter((v) => v > 0);

    const arr: ResultTableType[] = neighborSellPriceArray.map((sellPrice) => ({
      sellPrice: Number(sellPrice),
      tax: calculateMarketTax(sellPrice),
      profit: (
        (sellPrice - calculateMarketTax(sellPrice) - createPrice) *
        createQuantity
      ).toFixed(2),
    }));

    return arr;
  }, [createPrice, createQuantity, numResultsToShow, sellPrice]);

  const columns: Column<ResultTableType>[] = useMemo(
    () => [
      {
        Header: '판매 가격',
        accessor: 'sellPrice',
      },
      {
        Header: '거래소 수수료',
        accessor: 'tax',
      },
      {
        Header: '판매 이득',
        accessor: 'profit',
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: dataArray });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className='flex flex-nowrap max-w-full'>
      <table
        {...getTableProps()}
        className='table-auto border-collapse border-slate-700'
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className='border-4 border-slate-200 p-4'
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  {...row.getRowProps()}
                  className={clsx(
                    'border border-slate-300 text-center hover:cursor-default',
                    row.cells[0].value === sellPrice
                      ? 'border-green-400 border-[6px] '
                      : ''
                  )}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={clsx(
                            'px-4 py-2',
                            cell.column.id === 'profit' && cell.value < 0
                              ? 'bg-red-400'
                              : ''
                          )}
                        >
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default ShowTotalResults;
