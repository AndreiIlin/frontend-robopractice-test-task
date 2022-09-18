import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React from 'react';
import { useTable } from '../../hooks/useTable';
import { TableTitle } from '../../models/tableTitle';
import { getTitles } from '../../utils/helper';

const TableHeadCells: React.FC = () => {
  const titles: TableTitle[] = getTitles();
  const { handleSort, order, orderBy } = useTable();

  return (
    <TableHead>
      <TableRow>
        {titles.map((title) => (
          <TableCell
            key={title.id}
            sortDirection={orderBy === title.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === title.id}
              direction={orderBy === title.id ? order : 'asc'}
              onClick={handleSort(title.id)}
            >
              {title.label}
              {orderBy === title.id ? (
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
