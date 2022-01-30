// @ts-ignore
import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize } from '@/types';
import { Card, Popconfirm, Space, Typography } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import { extraAddDetailDelete } from '@/services/extraAdd';
import feedBack from '@/utils/apiFeedback';
import CommonRow from '@/components/commonRow';
import { useHistory } from 'umi';

const { Text } = Typography;

const UserCenter = () => {
  const history = useHistory();
  // @ts-ignore
  const { dataSource, loading, getExtraAddList, timeInfo } = useModel('userCentre');
  const { current, pageSize } = useModel('commonTable');
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
        <> <Text underline><a href="#" onClick={()=>{// @ts-ignore
          history.push({
          pathname:'/userCentre/allScore',
          query:{...accord}
        })}}>{text}</a></Text></>,
    },
    {
      title: '活动加分',
      dataIndex: 'activity_score',
      key: 'activity_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={()=>{// @ts-ignore
          history.push({
            pathname:'/userCentre/activityScore',
            query:{...accord}
          })}}>{text}</a></Text></>,
  },
    {
      title: '额外加分',
      dataIndex: 'extra_add_score',
      key: 'extra_add_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={()=>{// @ts-ignore
          history.push({
            pathname:'/userCentre/extraAddScore',
            query:{...accord}
          })}}>{text}</a></Text></>,
    },
    {
      title: '额外减分',
      dataIndex: 'extra_deduction_score',
      key: 'extra_deduction_score',
      render: (text: any, accord: API.personCenterResItem) =>
        <> <Text underline><a href="#" onClick={()=>{// @ts-ignore
          history.push({
            pathname:'/userCentre/extraDeduction',
            query:{...accord}
          })}}>{text}</a></Text></>,
    },
    {
      title: '创建日期',
      key: 'created_at',
      render: (text: any, accord: API.personCenterResItem) =>
        <>{dateChange(accord?.created_at)}</>
      ,
    },
    {
      title: '操作',
      key: 'extra_add_id',
      render: (record: any) => (
        <Space size="middle">

          <Popconfirm
            title="确定删除吗?"
            onConfirm={async () => {
              const res = await extraAddDetailDelete(record?.extra_add_detail_id);
              feedBack(res, '删除成功', '删除失败');
              sendApi({
                page_num: current || firstPage,
                page_size: pageSize || firstPageSize,
              });
              // deleteApi={(record: any) => extraAddDetailDelete(record?.extra_add_detail_id)}
            }}
            okText="确实"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer>
      <Card>
        <CommonRow sendApi={sendApi}/>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo } : null}/>
      </Card>
    </PageContainer>
  )
    ;
};
export default UserCenter;
