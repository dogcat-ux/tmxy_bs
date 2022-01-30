import { useCallback, useState } from 'react';
import { activityDetailList } from '@/services/activityDetail';

export default () => {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<API.ActivityRes[]>([]);
  const getDetailList = useCallback(async (id: number, body: API.ActivityDetailListParam) => {
    try {
      setLoading(true);
      const res = await activityDetailList(id, { ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    total,
    current,
    pageSize,
    setTotal,
    dataSource, setDataSource,
    loading, search, setSearch,getDetailList,
    setCurrent,
    setPageSize,
  };
};
