import { useCallback, useState } from 'react';
import { activityList } from '@/services/activityModule';
import { category } from '@/services/category';
import { useModel } from '@@/plugin-model/useModel';

export interface TimeInfo {
  startTime?: string,
  endTime?: string,
}

export default () => {
  const { setTotal } = useModel('commonTable');
  const [category1, setCategory1] = useState<string>('');
  const [activityTimeInfo, setActivityTimeInfo] = useState<TimeInfo>();
  const [enterTimeInfo, setEnterTimeInfo] = useState<TimeInfo>();
  const [search, setSearch] = useState('');
  const [categorys, setCategorys] = useState<API.categoryItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<API.ActivityRes[]>([]);
  const getList = useCallback(async (status?: number, body?: API.ActivityParam) => {
    try {
      // 0 返回审核中和审核失败  1返回审核通过
      setLoading(true);
      const res = await activityList({ ...body, status: status });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategorys = useCallback(async () => {
    // @ts-ignore
    const { data: { item } } = await category();
    setCategorys(item);
  }, []);

  return {
    categorys, getCategorys,
    category1, setCategory1,
    dataSource, setDataSource, getList,
    loading, search, setSearch,
    activityTimeInfo, setActivityTimeInfo,
    enterTimeInfo, setEnterTimeInfo,
  };
};
