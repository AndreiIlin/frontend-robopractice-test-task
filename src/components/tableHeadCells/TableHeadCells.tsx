import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { useTableData } from '../../hooks/useTableData';
import { TableHeadCell } from '../../models/tableHeadCell';
import { getTableHeadCells } from '../../utils/IDontKnowHowToName';

const TableHeadCells: React.FC = () => {
  const cells: TableHeadCell[] = getTableHeadCells();
  const { handleSort, order, orderBy } = useTableData();

  return (
    <TableHead>
      <TableRow>
        {cells.map((cell) => (
          <TableCell
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{}}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={handleSort(cell.id)}
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
