import { useCallback, useEffect, useState } from 'react';
import { firstPage, firstPageSize } from '@/types';
import { useModel } from '@@/plugin-model/useModel';
import { extraDeductionList } from '@/services/extraDeduction';
import { extraDeductionListItem, extraDeductionListParam } from '@/services/extraDeduction/data';

export interface TimeInfo {
  startTime?: string,
  endTime?: string,
}

export default () => {
  const [timeInfo, setTimeInfo] = useState<number>();
  const { setTotal, pageSize, current } = useModel('commonTable');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<extraDeductionListItem[]>([]);
  const getExtraAddList = useCallback(async (body?: extraDeductionListParam) => {
    try {
      setLoading(true);
      const res = await extraDeductionList({ ...body });
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
    setTimeInfo, timeInfo,
    dataSource, setDataSource, getExtraAddList,
    loading,
  };
};
