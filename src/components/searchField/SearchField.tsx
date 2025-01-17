import { TextField } from '@mui/material';
import React from 'react';
import { useData } from '../../hooks/useData';

const SearchField: React.FC = () => {
  const { searchValue, setSearchValue, isError , isLoading} = useData();
  return isError || isLoading ? null : <TextField
    sx={{ ml: 2 }}
    id="standard-basic"
    label="Enter username..."
    variant="standard"
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />
};

export default SearchField;
