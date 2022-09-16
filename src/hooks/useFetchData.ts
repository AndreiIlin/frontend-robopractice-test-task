import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserInfo } from '../models/userInfo';
import { routes } from '../utils/routes';

export const useFetchData = () => {
  const [data, setData] = useState<UserInfo[]>([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<UserInfo[]>(routes.dataPath());
        setLoading(false);
        setData(response.data);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  return { data, isError, isLoading };
};
