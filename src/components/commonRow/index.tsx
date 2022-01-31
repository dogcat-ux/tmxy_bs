import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import CommonSelect from '@/components/CommonSelect';
import CommonSearch from '@/components/CommonSearch';
import { useModel } from '@@/plugin-model/useModel';
import _ from 'lodash';
import AddForm, { formDataItem } from '@/components/addForm';

const CommonRow: React.FC<{
    sendApi: (data?: any) => void,
    isGrade?: boolean,
    isYear?: boolean,
    isSemester?: boolean,
    isAdd?: boolean,
    formData?: formDataItem[],
    onFinish?: (values: any) => void,
    isCategory?: boolean,
    isExport?: boolean
  }> = ({
          sendApi, isGrade = true, isYear = true,
          isSemester = true, isAdd = false,
          isCategory = false,
          isExport = false,
          formData, onFinish,
        }) => {
    const [nowYear, setNowYear] = useState('');
    const [category, setCategory] = useState<string>('');
    const [nowSearch, setNowSearch] = useState<any>();
    const [nowSemester, setNowSemester] = useState('');
    const [nowGrade, setNowGrade] = useState('');
    const { setYear, yearMap, setSemester, setGrade, setSemesters, getCategorys, categorys, semesteMap, grades, getGradeList, year, years, getYearList, semesters, getSemesterList } = useModel('commonRow');
    const sendApiTemp = (body?: any) => {
      const data1 = nowYear && yearMap && yearMap?.length > 0 ? {
        year_start_time_stamp: (yearMap?.filter((value: any) => value[nowYear]?.year_start_time))[0]?.[nowYear].year_start_time,
        year_end_time_stamp: (yearMap?.filter((value: any) => value[nowYear]?.year_end_time))[0]?.[nowYear].year_end_time,
      } : null;
      const data2 = nowSemester && semesteMap && semesteMap?.length > 0 ? {
        semester_start_time_stamp: (semesteMap?.filter((value: any) => value?.[nowSemester]?.semester_start_time))?.[0]?.[nowSemester].semester_start_time,
        semester_end_time_stamp: (semesteMap?.filter((value: any) => value[nowSemester]?.semester_end_time))?.[0]?.[nowSemester].semester_end_time,
      } : null;
      const data3 = nowGrade ? { grade: nowGrade } : null;
      const data4 = category ? { category } : null;
      sendApi({
        ...data1,
        ...data2,
        ...data3,
        ...data4,
        ...nowSearch,
        ...body,
      });
    };
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      console.log('semesteMap', semesteMap);
    }, [semesteMap]);

    const handleYear = (val: string) => {
      setYear(val);
      setNowYear(val);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !val && setSemesters([]);
    };
    const handleGrade = (val: string) => {
      setGrade(val);
      setNowGrade(val);
    };
    const handleSemester = (val: string) => {
      setSemester(val);
      setNowSemester(val);
    };
    const handleCategory = (val: string) => {
      setCategory(val);
    };
    const handleArr = (arr?: string[], str?: string) => {
      const temp = _.cloneDeep(arr);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      str && temp?.splice(0, 0, str);
      return temp;
    };
    const handleSearch = (data?: any) => {
      setNowSearch(data);
    };
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      nowSearch ? sendApiTemp({ ...nowSearch }) : sendApiTemp();
    }, [nowSearch]);
    useEffect(() => {
      getSemesterList(nowYear);
    }, [year]);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      nowGrade ? sendApiTemp({ grade: nowGrade }) : sendApiTemp();
    }, [nowGrade]);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // nowYear ? sendApiTemp({
      //   year_start_time_stamp: yearMap.map((value: any) => value[nowYear]?.year_start_time)[0],
      //   year_end_time_stamp: yearMap.map((value: any) => value[nowYear]?.year_end_time)[0],
      // }) : sendApiTemp();
      sendApiTemp();
    }, [nowYear]);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // nowSemester ? sendApiTemp({
      //   semester_start_time_stamp: semesteMap?.map((value: any) => value[nowSemester]?.semester_start_time)[0],
      //   semester_end_time_stamp: semesteMap?.map((value: any) => value[nowSemester]?.semester_end_time)[0],
      // }) : sendApiTemp();
      sendApiTemp();
    }, [nowSemester]);
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      category ? sendApiTemp({ category }) : sendApiTemp();
    }, [category]);
    useEffect(() => {
      Promise.all([getGradeList(), getYearList(), getCategorys()]);
    }, []);
    return (
      <Row className="theme-margin-bottom">
        {isGrade &&
        <Col span={4}> <CommonSelect defaultValue="全部年级" items={handleArr(grades, '全部年级') || []}
                                     sendApi={handleGrade}/></Col>}
        {isYear &&
        <Col span={4}> <CommonSelect defaultValue="全部学年" items={handleArr(years, '全部学年') || []} sendApi={handleYear}/>
        </Col>}
        {isSemester &&
        <Col span={4}> <CommonSelect defaultValue="全部学期" items={handleArr(semesters, '全部学期') || []}
                                     sendApi={handleSemester}/>
        </Col>}
        {isCategory &&
        <Col span={4}> <CommonSelect defaultValue="全部分类" items={handleArr(categorys, '全部分类') || []}
                                     sendApi={handleCategory}/>
        </Col>}
        <Col span={4}>
          <CommonSearch sendApi={handleSearch}/>
        </Col>
        {
          isAdd && formData && onFinish && <Col span={4}>
            <AddForm buttonString="添加一条" formData={formData} onFinish={onFinish}/>
          </Col>
        }
        {
          isExport && <Col span={4}>
            <Button>导出</Button>
          </Col>
        }
      </Row>
    );
  }
;

export default CommonRow;
