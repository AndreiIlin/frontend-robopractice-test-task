import axios from 'axios';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { IDataContext } from '../models/contexts';
import { UserInfo } from '../models/userInfo';
import { formatData } from '../utils/IDontKnowHowToName';
import { routes } from '../utils/routes';

export const DataContext = createContext<IDataContext | {}>({});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<UserInfo[]>([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue);
  const formattedData = formatData(data);
  const searchedData = formattedData.filter((user) => user.username.toLowerCase().includes(debouncedSearchValue.toLowerCase()));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get<UserInfo[]>(routes.dataPath());
        setLoading(false);
        setData(response.data);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ searchedData, isError, isLoading, searchValue, setSearchValue }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
