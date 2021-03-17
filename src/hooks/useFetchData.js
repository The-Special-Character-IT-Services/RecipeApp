import { useCallback, useEffect, useState } from 'react';
import fetcher from '@utils/fetcher';

const useFetchData = ({ query, variables, response }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const fetchData = useCallback(async () => {
    try {
      setLoading(false);
      const res = await fetcher(query, variables, response);
      setData(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [query, variables, response]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
  };
};

export default useFetchData;
