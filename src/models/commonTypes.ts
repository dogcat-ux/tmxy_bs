import { useCallback, useState } from 'react';
import { category } from '@/services/category';
import { extraType } from '@/services/userCentre';
// import { activityList } from '@/services/activityModule';

export default () => {
  const [category1, setCategory1] = useState<string>('');
  const [extraCategory, setExtraCategory] = useState<string>('');
  const [categorys, setCategorys] = useState<API.categoryItem[]>();
  const [extraCategorys, setExtraCategorys] = useState<API.TypeResItem[]>();
  const getCategorys = useCallback(async () => {
    // @ts-ignore
    const { data: { item } } = await category();
    setCategorys(item);
  }, []);
  const getExtraCategorys = useCallback(async (type: number) => {
    // @ts-ignore
    const { data: { item } } = await extraType({ type });
    setExtraCategorys(item);
  }, []);
  return {
    getExtraCategorys, getCategorys, categorys,
    extraCategorys, setExtraCategorys,category1,setCategory1,extraCategory,setExtraCategory
  };
};
