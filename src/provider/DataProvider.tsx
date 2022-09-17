import React, { createContext, ReactNode, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useFetchData } from '../hooks/useFetchData';
import { IDataContext } from '../models/context';
import { getDays, getTime } from '../utils/getTableHeadCells';

export const DataContext = createContext<IDataContext | {}>({});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const { data, isError, isLoading } = useFetchData();
  const fullMonthDays = getDays();
  const formattedData = data.map((user) => {
    const formattedDays = user.Days.map((day) => {
      return {
        day: new Date(day.Date).getDate(),
        time: getTime(day.End) - getTime(day.Start),
      };
    });
    const formattedFullDays = fullMonthDays.reduce((acc, d) => {
      const existingDay = formattedDays.find((fd) => fd.day === d);
      return existingDay ? {
        ...acc,
        [d.toString()]: existingDay.time,
        total: acc.total + existingDay.time,
      } : {
        ...acc,
        [d.toString()]: 0,
        total: acc.total,
      };
    }, { total: 0 });
    return {
      username: user.Fullname,
      ...formattedFullDays,
    };
  });
  const searchedData = formattedData.filter((user) => user.username.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
  return (
    <DataContext.Provider value={{ searchedData, isError, isLoading, searchValue, setSearchValue }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
