import React from 'react';
import { UserData } from './userInfo';

export interface IDataContext {
  searchedData: UserData[];
  isLoading: boolean;
  isError: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}
