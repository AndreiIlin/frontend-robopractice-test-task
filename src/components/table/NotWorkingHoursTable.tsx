import { Box, Paper, Table, TableContainer } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { Order } from '../../models/order';
import TableBodyCells from '../tableBodyCells/TableBodyCells';
import TableHeadCells from '../tableHeadCells/TableHeadCells';

const NotWorkingHoursTable: React.FC = () => {
  const { formattedData } = useData();

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('User');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="NotWorkingHoursTable">
            <TableHeadCells
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBodyCells
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default NotWorkingHoursTable;
