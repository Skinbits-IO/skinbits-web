import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActiveNotifications } from '../api';
import { setNotifications } from '../model';
import { useAppDispatch } from '../../../shared';

export function useActiveNotifications(limit = 10) {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const skip = page * limit;

  const {
    data = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['notifications', skip, limit],
    queryFn: () => getActiveNotifications(skip, limit),
    staleTime: Infinity,
    gcTime: 15 * (60 * 1000),
  });

  const hasMore = data.length === limit;

  function loadMore() {
    if (!isFetching && hasMore) {
      setPage((p) => p + 1);
    }
  }

  useEffect(() => {
    if (data) dispatch(setNotifications(data));
  }, [data]);

  return {
    isLoading,
    isError,
    isFetching,
    hasMore,
    loadMore,
  };
}
