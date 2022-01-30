import { useCallback, useState } from 'react';
import { activityList } from '@/services/activityModule';
import { category } from '@/services/category';
export interface TimeInfo {
  startTime?: string,
  endTime?: string,
}

export default () => {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [category1, setCategory1] = useState<string>('');
  const [activityTimeInfo, setActivityTimeInfo] = useState<TimeInfo>();
  const [enterTimeInfo, setEnterTimeInfo] = useState<TimeInfo>();
  // const [categoryName, setCategoryName] = useState('');
  const [search, setSearch] = useState('');
  const [categorys, setCategorys] = useState<API.categoryItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<API.ActivityRes[]>([]);
  const getList = useCallback(async (body?: API.ActivityParam) => {
    try {
      setLoading(true);
      const res = await activityList({ ...body });
      setDataSource(res?.data?.item || []);
      setTotal(res?.data?.total || 0);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategorys=useCallback(async ()=>{
    // @ts-ignore
    const {data:{item}}=await category();
    setCategorys(item);
  },[]);
  const clear= useCallback(()=>{
    setCurrent(0);
    setCategory1('');
    setActivityTimeInfo(undefined);
    setEnterTimeInfo(undefined);
  },[])

  return {
    // sendApi,sendNoDate,sendNoCate,
    categorys, getCategorys,
    category1, setCategory1,
    total,
    current,
    pageSize,
    setTotal,
    dataSource, setDataSource, getList,
    loading, search, setSearch,
    // categoryName, setCategoryName,
    setCurrent,
    setPageSize,
    activityTimeInfo,setActivityTimeInfo,
    enterTimeInfo,setEnterTimeInfo,
    clear
  };
};
