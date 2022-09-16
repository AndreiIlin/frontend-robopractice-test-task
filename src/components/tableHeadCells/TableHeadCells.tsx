import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { useData } from '../../hooks/useData';
import { Order } from '../../models/order';
import { TableHeadCell } from '../../models/tableHeadCell';
import { getTableHeadCells } from '../../utils/getTableHeadCells';

interface TableHeadCellsProps {
  order: Order;
  orderBy: string;
  onRequestSort: () => void;
}

const TableHeadCells: React.FC<TableHeadCellsProps> = ({order, orderBy, onRequestSort}) => {
  const cells: TableHeadCell[] = getTableHeadCells();
  const createSortHandler =
    (property) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {cells.map((cell) => (
          <TableCell
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={createSortHandler(cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>

    </TableHead>
  );
};

export default TableHeadCells;
