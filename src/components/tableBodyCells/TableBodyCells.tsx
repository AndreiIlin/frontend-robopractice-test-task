import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { Order } from '../../models/order';
import { getFormattedTime } from '../../utils/getTableHeadCells';

interface TableBodyCellsProps {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
}

const TableBodyCells: React.FC<TableBodyCellsProps> = ({ page, rowsPerPage, order, orderBy }) => {
  const { searchedData } = useData();

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
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number => order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchedData.length) : 0;

  return (
    <TableBody>
      {searchedData
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user) => {
          const keys = Object.keys(user).sort((a, b) => {
            if (a === 'username' || b === 'username') return -1;
            return 0;
          });
          const cells = keys.map((key) => key === 'username' ? (
              <TableCell
                key={key}
                component={'th'}
                scope={'row'}
              >
                {user.username}
              </TableCell>
            ) : (
              <TableCell key={key}>
                {getFormattedTime(user[key] as number)}
              </TableCell>
            ),
          );
          return (
            <TableRow
              hover
              key={user.username}
              style={{ height: 75 }}
            >
              {cells}
            </TableRow>
          );
        })
      }
      {emptyRows > 0 && (
        <TableRow
          style={{ height: 75 * emptyRows }}
        >
          <TableCell colSpan={33} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyCells;
