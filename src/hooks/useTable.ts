import { useContext } from 'react';
import { ITableContext } from '../models/contexts';
import { TableContext } from '../provider/TableProvider';

export const useTable = () => useContext(TableContext) as ITableContext;
