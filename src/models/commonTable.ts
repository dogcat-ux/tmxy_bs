import { useCallback, useState } from 'react';
import { firstPage, firstPageSize } from '@/types';

const CommonTableData=() => {
  const [current, setCurrent] = useState(firstPage);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(firstPageSize);
  const [editData, setEditData] = useState<any>();
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const clear = useCallback(() => {
    setEditData(null);
  }, []);
  return {
    clear,
    editFormVisible, setEditFormVisible,
    addFormVisible, setAddFormVisible,
    editData, setEditData,
    total,
    current,
    pageSize,
    setTotal,
    setCurrent,
    setPageSize,
  };
};
export default CommonTableData;
