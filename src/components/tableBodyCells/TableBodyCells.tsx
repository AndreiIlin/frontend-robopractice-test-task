import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { Order } from '../../models/order';
import { FormattedDay, FormattedUserInfo } from '../../models/userInfo';
import { getFormattedTime } from '../../utils/getTableHeadCells';

interface TableBodyCellsProps {
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
}

const TableBodyCells: React.FC<TableBodyCellsProps> = ({ page, rowsPerPage, order, orderBy }) => {
  const { formattedData } = useData();

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy === 'days') return;

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(
    order: Order,
    orderBy: string,
  ): (
    a: string,
    b: string,
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - formattedData.length) : 0;

  return (
    <TableBody>
      {formattedData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy))
        .map((user) => (
          <TableRow
            hover
            key={user.id}
          >
            <TableCell
              component={'th'}
              scope={'row'}
            >
              {user.username}
            </TableCell>
            {user.days
              .sort(getComparator(order, orderBy))
              .map((d) => (
              <TableCell>
                {getFormattedTime(d.time)}
              </TableCell>
            ))}
            <TableCell>
              {getFormattedTime(user.total)}
            </TableCell>
          </TableRow>
        ))
      }
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={33} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyCells;
