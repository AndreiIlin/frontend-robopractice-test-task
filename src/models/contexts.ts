import React from 'react';
import { Order } from './order';
import { UserData } from './userInfo';

export interface IDataContext {
  searchedData: UserData[];
  isLoading: boolean;
  isError: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ITableDataContext {
  order: Order;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  handleSort: (property: string) => () => void;
  getComparator: (order: Order, orderBy: string) => (a: UserData, b: UserData) => number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
