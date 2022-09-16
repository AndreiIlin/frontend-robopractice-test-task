import { TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { getFormattedTime } from '../../utils/getTableHeadCells';

interface TableBodyCellsProps {
  page: number;
  rowsPerPage: number;
}

const TableBodyCells: React.FC<TableBodyCellsProps> = ({ page, rowsPerPage }) => {
  const { formattedData } = useData();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - formattedData.length) : 0;

  return (
    <TableBody>
      {formattedData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user) => (
          <TableRow
            hover
            key={user.id}
          >
            <TableCell
              component={'th'}
              scope={'row'}
            >
              {user.name}
            </TableCell>
            {user.days.map((d) => (
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
