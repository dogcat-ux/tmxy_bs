// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize } from '@/types';
import { extraAddDetailListItem, extraAddParam } from '@/services/extraAdd/data';
import { Card, Col, Input, InputNumber, Popconfirm, Row, Space } from 'antd';
import { useHistory } from 'umi';
import { EditTwoTone } from '@ant-design/icons';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons/lib';
import CommonSearch from '@/components/CommonSearch';
import { extraAddDetailAdd, extraAddDetailDelete, extraAddDetailImport } from '@/services/extraAdd';
import AddForm from '@/components/addForm';
import UpLoadFile from '@/components/upLoadFile';
import feedBack from '@/utils/apiFeedback';
import { useModel } from '@@/plugin-model/useModel';

const ExtreAddDetail = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const { dataSource, loading, getExtraAddList, timeInfo, extraDetailAmend } = useModel('extraAddDetail');
  const [isAmended, setIsAmended] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [ID, setID] = useState<number>();
  const routes = [
    {
      path: '',
      breadcrumbName: '活动中心',
    },
    {
      path: '',
      breadcrumbName: '额外加分',
    },
    {
      path: '',
      breadcrumbName: query?.add_score_category,
    },
  ];
  const { current, pageSize } = useModel('commonTable');
  const sendApi = async (body?: any) => {
    const parms = {
      extra_add_id: query?.extra_add_id,
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
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '加分原因',
      dataIndex: 'add_score_result',
      key: 'add_score_result',
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      render: (scoreNow: number, record: any, index: number) => <>{isAmended&&ID===index ?
        (
          <>
            <InputNumber style={{ width: 100 }} defaultValue={scoreNow} value={score} onChange={(value) => {
              setScore(Number(value));
            }}/>&nbsp;
            <CloseCircleTwoTone style={{ fontSize: 20 }} onClick={() => {
              setIsAmended(!isAmended);
            }}/>&nbsp;
            <CheckCircleTwoTone style={{ fontSize: 20 }}
                                onClick={() => {
                                  setIsAmended(!isAmended);
                                  extraDetailAmend(record?.extra_add_detail_id, { score });
                                  sendApi();
                                }}
            /></>
        ) :
        (<>
          <span>{scoreNow}</span>
          < EditTwoTone style={{ fontSize: 20 }} onClick={() => {
            setIsAmended(!isAmended);
            setScore(scoreNow);
            setID(index);
          }}/>
        </>)
      }
      </>,
    },
    {
      title: '加分日期',
      key: 'created_at',
      render: (text: any, accord: extraAddDetailListItem) =>
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
  const AddForms = [
    {
      label: '学号',
      name: 'stu_number',
      rules: [{ required: true }],
      children: <Input/>,
    },
    {
      label: '加分原因',
      name: 'add_score_result',
      rules: [{ required: true }],
      children: <Input/>,
    },
    {
      label: '分数',
      name: 'score',
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
  ];
  const onAddSubmit = async (data: extraAddParam) => {
    const res = await extraAddDetailAdd({ ...data, extra_add_id: query?.extra_add_id });
    feedBack(res, '增加成功！', '增加失败');
    sendApi();
  };
  useEffect(() => {
    sendApi()
  }, []);
  return (
    <PageContainer title={query?.add_score_category} breadcrumb={{ routes }} onBack={() => {
      history.push('/activityCentre/extraAdd');
    }}>
      <Card>
        <Row className="theme-margin-bottom">
          <Col span={5}>
            <CommonSearch sendApi={sendApi}/>
          </Col>
          <Col span={3}>
            <UpLoadFile senApi={(file) => extraAddDetailImport({ file, extra_add_id: query?.extra_add_id })} freshData={sendApi}/>
          </Col>
          <Col span={5}>
            <AddForm buttonString="添加一条" formData={AddForms} onFinish={onAddSubmit}/>
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo }:null}/>
      </Card>
    </PageContainer>
  )
    ;
};
export default ExtreAddDetail;
