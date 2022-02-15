import { useCallback, useState } from 'react';
import { extraAddDetailAmend } from '@/services/extraAdd';
import {
  extraAddDetailListItem,
  extraAddDetailListParam,
} from '@/services/extraAdd/data';
import { useModel } from '@@/plugin-model/useModel';
import feedBack from '@/utils/apiFeedback';
import { personCenter } from '@/services/userCentre';


const ExtreAddDetail = () => {
  const { setTotal } = useModel('commonTable');
  const [timeInfo, setTimeInfo] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<extraAddDetailListItem[]>([]);
  const getExtraAddList = useCallback(async (body?: extraAddDetailListParam) => {
    try {
      setLoading(true);
      const res = await personCenter({ ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);
  const extraDetailAmend = useCallback(async (id: number, body: { score: number }) => {
    try {
      const res = await extraAddDetailAmend(id, { ...body });
      feedBack(res, '修改成功', '修改失败');
    } catch (e) {
      console.log(e);
    }
  }, []);
  return {
    setTimeInfo, timeInfo,
    dataSource, setDataSource, getExtraAddList,
    loading,
    extraDetailAmend,
  };
};
export default ExtreAddDetail;
