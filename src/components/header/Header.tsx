import { AppBar, Typography } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  return (
    <AppBar position={'static'}>
      <Typography variant={'h6'} sx={{ p: 1}}>red_mad_robot test task</Typography>
    </AppBar>
  );
};

export default Header;
