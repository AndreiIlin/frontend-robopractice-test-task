import React from 'react';
import { SortOrder } from './sortOrder';
import { TableData } from './tableData';

export interface IDataContext {
  searchedData: TableData[];
  isLoading: boolean;
  isError: boolean;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface ITableContext {
  order: SortOrder;
  orderBy: string;
  page: number;
  rowsPerPage: number;
  handleSort: (property: string) => () => void;
  getComparator: (order: SortOrder, orderBy: string) => (a: TableData, b: TableData) => number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
