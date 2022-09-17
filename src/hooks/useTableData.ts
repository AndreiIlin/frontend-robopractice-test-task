import { useContext } from 'react';
import { ITableDataContext } from '../models/contexts';
import { TableDataContext } from '../provider/TableDataProvider';

export const useTableData = () => useContext(TableDataContext) as ITableDataContext;
