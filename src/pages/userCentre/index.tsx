// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize } from '@/types';
import { Card, Typography, Input } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import feedBack from '@/utils/apiFeedback';
import CommonRow from '@/components/commonRow';
import { useHistory } from 'umi';
import { personCenterDelete, personCenterPut } from '@/services/userCentre';

const { Text } = Typography;

const UserCenter = () => {
  const history = useHistory();
  // @ts-ignore
  const { dataSource, loading, getExtraAddList, timeInfo } = useModel('userCentre');
  const { current, pageSize } = useModel('commonTable');
  const [item, setItem] = useState<any>();
  const sendApi = async (body?: any) => {
    const parms = {
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getExtraAddList({ ...parms });
  };
  const columns = [
    {
      title: '学号',
      dataIndex: 'stu_number',
      key: 'stu_number',
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '联系方式',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: '总分',
      dataIndex: 'all_score',
      key: 'all_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={() => {// @ts-ignore
          history.push({
            pathname: '/userCentre/allScore',
            query: { ...accord },
          });
        }}>{text}</a></Text></>,
    },
    {
      title: '活动加分',
      dataIndex: 'activity_score',
      key: 'activity_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={() => {// @ts-ignore
          history.push({
            pathname: '/userCentre/activityScore',
            query: { ...accord },
          });
        }}>{text}</a></Text></>,
    },
    {
      title: '额外加分',
      dataIndex: 'extra_add_score',
      key: 'extra_add_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={() => {// @ts-ignore
          history.push({
            pathname: '/userCentre/extraAddScore',
            query: { ...accord },
          });
        }}>{text}</a></Text></>,
    },
    {
      title: '额外减分',
      dataIndex: 'extra_deduction_score',
      key: 'extra_deduction_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={() => {// @ts-ignore
          history.push({
            pathname: '/userCentre/extraDeduction',
            query: { ...accord },
          });
        }}>{text}</a></Text></>,
    },
    {
      title: '创建日期',
      key: 'created_at',
      render: (text: any, accord: API.personCenterResItem) =>
        <>{dateChange(accord?.created_at)}</>
      ,
    },
  ];
  const forms = [
    {
      label: '学号',
      name: 'stu_number',
      rules: [{ required: true }],
      initialValue: item?.stu_number,
      children: <Input disabled/>,
    },
    {
      label: '姓名',
      name: 'user_name',
      rules: [{ required: true }],
      initialValue: item?.user_name,
      children: <Input/>,
    },
    {
      label: '联系方式',
      name: 'phone',
      rules: [{ required: true },
        {
          pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
          message: '请输入正确格式的手机号码',
        }],
      initialValue: item?.phone_number,
      children: <Input/>,
    },
  ];
  const onSubmit = async (data: any) => {
    const res = await personCenterPut({ ...data });
    feedBack(res, '修改成功', '修改失败');
    sendApi();
  };
  // const exportClick = async () => {
  //   // await exportActivityDetail({
  //   //   grade: string
  //   //   year_start_time_stamp?: number
  //   //   year_end_time_stamp?: number
  //   //   semester_start_time_stamp?: number
  //   //   semester_end_time_stamp?: number
  //   //   info?: string
  //   //   page_size?: number
  //   //   page_num?: number
  //   //   total?: number// 1 表示导出所有 0 表示导出该页
  //   // });
  // };

  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer>
      <Card>
        <CommonRow sendApi={sendApi} isExport={true}/>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo } : null}
                     onAmend={(record) => {
                       setItem(record);
                     }}
                     isAction={true} isLook={false} formData={forms} onFinish={onSubmit}
                     deleteApi={(record: any) => personCenterDelete({ stu_number: record?.stu_number })}
        />
      </Card>
    </PageContainer>
  )
    ;
};
export default UserCenter;
