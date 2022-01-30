import { useCallback, useState } from 'react';
import { gradeList, semesterList, yearList } from '@/services/userCentre';
import { category } from '@/services/category';

export default () => {
  // const [categorys, setCategorys] = useState<API.categoryItem[]>();
  const [categorys, setCategorys] = useState<string[]>();
  const [grades, setGrades] = useState<string[]>();
  const [grade, setGrade] = useState<string>();
  const [years, setYears] = useState<string[]>();
  const [yearMap, setYearMap] = useState<any>();
  const [semesteMap, setSemesteMap] = useState<any>();
  const [semesters, setSemesters] = useState<string[]>();
  const [semester, setSemester] = useState<string>();
  const [year, setYear] = useState<string>();
  const [search, setSearch] = useState('');
  const getGradeList = useCallback(async () => {
    try {
      const { data } = await gradeList();
      setGrades(data?.item);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getCategorys = useCallback(async () => {
    // @ts-ignore
    const { data: { item } } = await category();
    setCategorys(item?.map((value: API.categoryItem) => value.category_name));
  }, []);
  const getYearList = useCallback(async () => {
    try {
      const { data } = await yearList();
      setYears(data?.item?.map(value => value?.year + ''));
      const arr = data?.item?.map(value => {
        const temp = {};
        temp[value.year] = {
          year_start_time: value.year_start_time,
          year_end_time: value.year_end_time,
        };
        return temp;
      });
      console.log('arrarr', arr);
      setYearMap(arr);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getSemesterList = useCallback(async (oneYear: string) => {
    try {
      if (oneYear) {
        const { data } = await semesterList({ year: oneYear });
        // @ts-ignore
        setSemesters(data?.item?.map(value => value?.semester));
        const arr = data?.item?.map(value => {
          const temp = {};
          if (value.semester) {
            temp[value.semester] = {
              semester_start_time: value.semester_start_time,
              semester_end_time: value.semester_end_time,
            };
          }
          return temp;
        });
        setSemesteMap(arr);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    getCategorys, categorys,
    setYear,
    semester, setSemester,
    grade, setGrade,
    search, setSearch, setSemesters,
    grades, getGradeList,
    years, getYearList,
    semesters, getSemesterList,
    yearMap, semesteMap, year,
  };
};
