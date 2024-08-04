import React, { FC, useState } from 'react';

import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import { User } from '../../types/types';
import { useUserContext } from '../../context/UserContext';
import { useTable, useResizeColumns, useSortBy, HeaderGroup, Column, SortByFn } from 'react-table';
import styles from './Table.module.css';


type TableData = {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
};
 
export const columns: Column<TableData>[] = [{ Header: '№', accessor: 'id' },
  { Header: 'ФИО', accessor: 'fullName', sortType: 'string' },
  { Header: 'ВОЗРАСТ', accessor: 'age', sortType: 'string' },
  { Header: 'ПОЛ', accessor: 'gender', sortType: 'string' },
  { Header: 'НОМЕР ТЕЛ.', accessor: 'phone' },
  { Header: 'АДРЕС', accessor: 'address', sortType: 'string' }]

  // типы сортировки
  const sortTypes: Record<string, SortByFn<TableData>> = {
    // перезаписывает встроенный тип `string`
    string: (rowA, rowB, columnId, desc) => {
      const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
        string,
        string
      ]

      return a.localeCompare(b, 'en')
    }
  }


export const Table: FC = () => {
  const { users } = useUserContext();
  const [sortKey, setSortKey] = useState<keyof User | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
 
  
   

  const data = React.useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        fullName: `${user.firstName} ${user.lastName} ${user.maidenName}`,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        address: `${user.address.city}, ${user.address.address}`,
      })),
    [users]
  );

    // создаем экземпляр таблицы
    const {
  
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({ columns, data, sortTypes }, useSortBy)

    /* const handleSort = (key: keyof User) => {
      if (sortKey === key) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDirection('asc');
      }
    };
*/
    const handleResetSort = () => {
      setSortKey(null);
      setSortDirection(null);
    }; 

    return (
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hG) => (
            <tr {...hG.getHeaderGroupProps()}>
              {hG.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${column.isSorted ? 'sorted' : ''} ${column.isSortedDesc ? 'desc' : ''
                    }`}
                >

                  <div className={styles.TableTh}>
                    <h5>{column.render('Header')}</h5>
                    <div className={styles.arrowIcons}>
                      {column.isSorted && !column.isSortedDesc && <FaArrowUp />}
                      {column.isSorted && column.isSortedDesc && <FaArrowDown />}
                      {column.isSorted && (
                        <FaTimes onClick={handleResetSort} />
                      )}
                    </div>
                  </div>
                  <div
                  /*   {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? 'isResizing' : ''}`} */
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
