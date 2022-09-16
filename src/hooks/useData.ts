import { useContext } from 'react';
import { IDataContext } from '../models/context';
import { DataContext } from '../provider/DataProvider';

export const useData = () => useContext(DataContext) as IDataContext;
