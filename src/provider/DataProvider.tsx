import React, { createContext, ReactNode } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { IDataContext } from '../models/context';
import { FormattedUserInfo } from '../models/userInfo';
import { getDays, getTime } from '../utils/getTableHeadCells';


export const DataContext = createContext<IDataContext | {}>({});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { data, isError, isLoading } = useFetchData();
  const fullMonthDays = getDays();
  const formattedData: FormattedUserInfo[] = data.map((user) => {
    const formattedDays = user.Days.map((day) => {
      return {
        day: new Date(day.Date).getDate(),
        time: getTime(day.End) - getTime(day.Start),
      };
    });
    const formattedFullDays = fullMonthDays.map((d) => {
      const existingDay = formattedDays.find((fd) => fd.day === d);
      if (!existingDay) {
        return {
          day: d,
          time: 0,
        };
      }
      return {
        day: d,
        time: existingDay.time,
      };
    });
    const totalTime = formattedFullDays.reduce((acc, v) => acc + v.time, 0);
    return {
      id: user.id,
      name: user.Fullname,
      days: formattedFullDays,
      total: totalTime,
    };
  });
  console.log(formattedData);

  return (
    <DataContext.Provider value={{ formattedData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
