import { TablePagination } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';
import { useTable } from '../../hooks/useTable';

const Pagination: React.FC = () => {
  const { searchedData } = useData();
  const { rowsPerPage, page, handleChangeRowsPerPage, handleChangePage } = useTable();

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={searchedData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
