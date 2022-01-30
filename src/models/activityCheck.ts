import { useCallback, useState } from 'react';
import { activityList } from '@/services/activityModule';

export default () => {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [activityStartTime, setActivityStartTime] = useState('');
  const [activityEndTime, setActivityEndTime] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<API.ActivityRes[]>([]);
  const getList = useCallback(async (body?: API.ActivityParam) => {
    try {
      setLoading(true);
      const res = await activityList({ ...body });
      setDataSource(res?.data?.item||[]);
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
    dataSource, setDataSource, getList,
    activityEndTime, setActivityEndTime,
    loading, search, setSearch,
    categoryName,setCategoryName,
    setCurrent,
    setPageSize,
    activityStartTime,
    setActivityStartTime
  };
};
