import { useCallback, useState } from 'react';
import { allScoreDetail } from '@/services/userCentre';
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { setTotal } = useModel('commonTable');
  const [timeInfo, setTimeInfo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<API.allScoreDetailResItem[]>([]);
  const getList = useCallback(async (body?: API.allScoreDetailParam) => {
    try {
      setLoading(true);
      const res = await allScoreDetail({ ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    setTimeInfo, timeInfo,
    dataSource, setDataSource, getList,
    loading,
  };
};
