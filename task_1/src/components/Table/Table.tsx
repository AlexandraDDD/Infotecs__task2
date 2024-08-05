import React, { FC, useRef, useState } from 'react';

import { FaArrowUp, FaArrowDown, FaTimes } from 'react-icons/fa';
import { User } from '../../types/types';
import { useUserContext } from '../../context/UserContext';
import { useTable, useResizeColumns, useSortBy, HeaderGroup, SortByFn, Column as ReactTableColumn } from 'react-table';

import styles from './Table.module.css';

interface TableProps {
  handleModal: (Id: number, show: boolean) => void;
}

type Column<T extends object> = ReactTableColumn<T> & {
  canResize?: boolean;
};

type TableData = {
  id: number;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;

};


export const columns: Column<TableData>[] = [
  { Header: '№', accessor: 'id', disableSortBy: true, width: 51, minWidth: 50, /* canResize: false, disableResizing: true  */ },
  { Header: 'ФИО', accessor: 'fullName', sortType: 'string', minWidth: 50, canResize: true },
  { Header: 'ВОЗРАСТ', accessor: 'age', sortType: 'number', minWidth: 50, canResize: true },
  { Header: 'ПОЛ', accessor: 'gender', minWidth: 50, canResize: true },
  { Header: 'НОМЕР ТЕЛ.', accessor: 'phone', disableSortBy: true, minWidth: 50, canResize: true },
  { Header: 'АДРЕС', accessor: 'address', sortType: 'string', minWidth: 50, canResize: true }
]

// типы сортировки

export const sortTypes: Record<string, SortByFn<TableData>> = {
  string: (rowA, rowB, columnId, desc) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      string,
      string
    ]

    return a.localeCompare(b, 'en')
  },
  number: (rowA, rowB, columnId, desc) => {
    const [a, b] = [rowA.values[columnId], rowB.values[columnId]] as [
      number,
      number
    ]

    return a - b
  }
}



export const Table: FC<TableProps> = ({handleModal}) => {
  const { users } = useUserContext();

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
  const autoResetResize = useRef(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

  } = useTable(
    {
      columns,
      data,
      sortTypes,
      autoResetResize: autoResetResize.current,
    },
    useSortBy,
    useResizeColumns
  );
  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((hG) => (
          <tr {...hG.getHeaderGroupProps()}>
            {hG.headers.map((column) => (


              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  minWidth: 50,
                  padding: '5px',
                  width: column.width,
                  resize: 'horizontal',
                  overflow: 'hidden',
                }}
              >
                {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    style={{

                      height: '100%',
                      width: '5px',
                      cursor: 'col-resize',
                      userSelect: 'none',
                    }}
                  />
                )}
                <div
                  className={styles.TableTh}
                >
                  <h6>{column.render('Header')}</h6>
                  <div className={styles.arrowIcons}>
                    {column.isSorted && !column.isSortedDesc && <FaArrowUp />}
                    {column.isSorted && column.isSortedDesc && <FaArrowDown />}
                  </div>
                </div>

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} onClick={() => {
              handleModal(row.original.id, true)
            }} style={{cursor: 'pointer'}}>
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
