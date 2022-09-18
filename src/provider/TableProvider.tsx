import React, { createContext } from 'react';
import { ITableContext } from '../models/contexts';
import { SortOrder } from '../models/sortOrder';

export const TableContext = createContext<ITableContext | {}>({});

interface TableDataProviderProps {
  children: React.ReactNode;
}

const TableProvider: React.FC<TableDataProviderProps> = ({ children }) => {
  const [order, setOrder] = React.useState<SortOrder>('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSort = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const descendingComparator = <T, >(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = <Key extends keyof any>(
    order: SortOrder,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number => order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContext.Provider
      value={{
        order,
        orderBy,
        page,
        rowsPerPage,
        handleSort,
        getComparator,
        handleChangePage,
        handleChangeRowsPerPage,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
