import { useCallback, useState } from 'react';
import { scoreDetail, scoreDetailAmend } from '@/services/userCentre';
import scoreDetailParam, { scoreDetailResItem } from '@/services/userCentre/data';
import feedBack from '@/utils/apiFeedback';
import { useModel } from '@@/plugin-model/useModel';

export default () => {
  const { setTotal } = useModel('commonTable');
  const [timeInfo, setTimeInfo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<scoreDetailResItem[]>([]);
  const getList = useCallback(async (body?: scoreDetailParam) => {
    try {
      setLoading(true);
      const res = await scoreDetail({ ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);
  const extraDetailAmend = useCallback(async (body: {
    id: number,
    score: number,
    stu_number: string,
    type: number
  }) => {
    try {
      const res = await scoreDetailAmend( { ...body });
      feedBack(res, '修改成功', '修改失败');
    } catch (e) {
      console.log(e);
    }
  }, []);
  return {
    setTimeInfo, timeInfo, extraDetailAmend,
    dataSource, setDataSource, getList,
    loading,
  };
};
