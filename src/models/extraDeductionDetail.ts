import { useCallback, useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import feedBack from '@/utils/apiFeedback';
import { extraDeductionDetailListItem, extraDeductionDetailListParam } from '@/services/extraDeduction/data';
import { extraDeductionDetailAmend, extraDeductionDetailList } from '@/services/extraDeduction';


// @ts-ignore
const ExtreAddDetail = () => {
  const [timeInfo, setTimeInfo] = useState<number>();
  // @ts-ignore
  const { setTotal, pageSize, current } = useModel('commonTable');
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<extraDeductionDetailListItem[]>([]);
  const getExtraDeductionList = useCallback(async (body?: extraDeductionDetailListParam) => {
    setLoading(true);
    const res = await extraDeductionDetailList({ ...body });
    setLoading(false);
    setDataSource(res?.data?.item || []);
    setTotal(res?.data?.total || 0);
    return res?.data?.item;
  }, []);
  const extraDetailAmend = useCallback(async (id: number, body: { score: number }) => {
    try {
      const res = await extraDeductionDetailAmend(id, { ...body });
      feedBack(res, '修改成功', '修改失败');
    } catch (e) {
      console.log(e);
    }
  }, []);
  return {
    pageSize,
    current,
    setTimeInfo, timeInfo,
    dataSource, setDataSource, getExtraDeductionList,
    loading,
    extraDetailAmend,
  };
};
export default ExtreAddDetail;
