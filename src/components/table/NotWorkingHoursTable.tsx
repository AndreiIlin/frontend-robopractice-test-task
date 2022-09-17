import { Box, CircularProgress, Paper, Table, TableContainer, Typography } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { Order } from '../../models/order';
import TableBodyCells from '../tableBodyCells/TableBodyCells';
import TableHeadCells from '../tableHeadCells/TableHeadCells';
import Pagination from '../tablePagination/Pagination';

const NotWorkingHoursTable: React.FC = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('username');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { isError, isLoading } = useData();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  if (isLoading) return (
    <>
      <CircularProgress color="secondary" />
      <CircularProgress color="success" />
      <CircularProgress color="inherit" />
    </>
  );

  if (isError) return (
    <Typography variant={'h5'}>Oops something goes wrong.... Please refresh the page</Typography>
  );


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
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
        <Pagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default NotWorkingHoursTable;
