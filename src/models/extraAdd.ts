import { useCallback, useEffect, useState } from 'react';
import { extraAddList } from '@/services/extraAdd';
import { extraAddListParam, extraAddListResItem } from '@/services/extraAdd/data';
import { firstPage, firstPageSize } from '@/types';
import { useModel } from '@@/plugin-model/useModel';

export interface TimeInfo {
  startTime?: string,
  endTime?: string,
}

export default () => {
  const [timeInfo, setTimeInfo] = useState<number>();
  const { setTotal,pageSize,current } = useModel('commonTable');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<extraAddListResItem[]>([]);
  const getExtraAddList = useCallback(async (body?: extraAddListParam) => {
    try {
      setLoading(true);
      const res = await extraAddList({ ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getExtraAddList({
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
    });
  }, []);
  return {
    setTimeInfo,timeInfo,
    dataSource, setDataSource, getExtraAddList,
    loading,
  };
};
