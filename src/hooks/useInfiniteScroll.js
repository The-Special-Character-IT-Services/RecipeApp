import fetcher from '@utils/fetcher';
import { useCallback, useState, useEffect } from 'react';

const useInfiniteScroll = ({ callback, callbackProps, limit, response }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMore = useCallback(async () => {
    try {
      setLoading(true);
      const query = callback({ ...callbackProps, pageIndex: page, limit });
      const res = await fetcher(query, null, response);
      setData([...data, ...res]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return {
    setPage,
    page,
    data,
    loading,
    error,
  };
};

export default useInfiniteScroll;
