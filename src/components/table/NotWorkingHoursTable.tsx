import { Alert, Box, Paper, Table, TableContainer } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import TableProvider from '../../provider/TableProvider';
import TableBodyCells from '../tableBodyCells/TableBodyCells';
import TableHeadCells from '../tableHeadCells/TableHeadCells';
import Pagination from '../tablePagination/Pagination';
import TableSkeleton from '../tableSkeleton/TableSkeleton';

const NotWorkingHoursTable: React.FC = () => {
  const { isError, isLoading } = useData();

  if (isLoading) return <TableSkeleton />;

  if (isError) return (
    <Alert severity="error">Oops something is going wrong.... Please refresh the page</Alert>
  );

  return (
    <TableProvider>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table aria-labelledby="NotWorkingHoursTable">
              <TableHeadCells />
              <TableBodyCells />
            </Table>
          </TableContainer>
          <Pagination />
        </Paper>
      </Box>
    </TableProvider>
  );
};

export default NotWorkingHoursTable;
