import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const TableSkeleton: React.FC = () => {
  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Skeleton variant="rectangular" height={75} />
      <Skeleton variant="rectangular" height={75} />
      <Skeleton variant="rectangular" height={75} />
      <Skeleton variant="rectangular" height={75} />
      <Skeleton variant="rectangular" height={75} />
    </Stack>
  );
};

export default TableSkeleton;
