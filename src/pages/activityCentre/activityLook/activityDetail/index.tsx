// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col, InputNumber,
  Pagination,
  Popconfirm,
  Row,
  Table,
} from 'antd';

import { dateChange } from '@/utils/dateChange';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'umi';

import { Input, Space } from 'antd';
import CommonSearch from '@/components/CommonSearch';
import UpLoadFile from '@/components/upLoadFile';
import AddForm from '@/components/addForm';
import { extraAddParam } from '@/services/extraAdd/data';
import feedBack from '@/utils/apiFeedback';
import { activityDetailUpload, creatActivityDetail, deleteActivityDetail } from '@/services/activityDetail';
import { useModel } from '@@/plugin-model/useModel';

const ActivityDetail = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const activity = query;
  const firstPage = useState(1)[0];
  const firstPageSize = useState(10)[0];
  const { pageSize, getDetailList, current, total, dataSource, loading, setCurrent, setPageSize } = useModel('detailCommon');
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
      title: '得分',
      dataIndex: 'activity_score',
      key: 'activity_score',
    },
    {
      title: '加分日期',
      key: 'add_date',
      render: (accord: API.ActivityDetailListRes) => <>{accord?.add_date===0?"-":dateChange(accord?.add_date)}</>,
    },
    {
      title: '参与情况',
      key: 'activity_status',
      // "activity_status": 2 // 参与情况  未参与0 未签退1 已参与2
      render: (accord: API.ActivityDetailListRes) => {
        if (accord.activity_status === 0) {
          return (<>未参与</>);
        } else if (accord.activity_status === 1) {
          return (<>未签退</>);
        } else if (accord.activity_status === 2) {
          return (<>已参与</>);
        } else {
          return (<>未知</>);
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: API.ActivityDetailListRes) => (
        <Space size="middle">
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={async () => {
              feedBack(await deleteActivityDetail(record?.activity_detail_id), '删除成功', '删除失败');
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              await sendApi();
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const sendApi = async (body?: any) => {
    const parms = {
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getDetailList(activity?.activity_id, parms);
  };
  const handleChange = async (page?: number, ps?: number) => {
    setCurrent(page || firstPage);
    setPageSize(ps || firstPageSize);
    await sendApi({
      page_num: page || firstPage,
      page_size: ps || firstPageSize,
    });
  };
  // const onSearch = (value: string) => {
  //   setSearch(value);
  //   if (value) {
  //     sendApi({ info: value });
  //   } else {
  //     sendApi();
  //   }
  // };
  useEffect(() => {
    console.log(query);
    Promise.all([sendApi()]);
  }, []);
  const routes = [
    {
      path: '',
      breadcrumbName: '活动中心',
    },
    {
      path: '',
      breadcrumbName: '活动查看',
    },
    {
      path: '',
      breadcrumbName: activity?.activity_name,
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
      label: '得分',
      name: 'score',
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
  ];
  const onAddSubmit = async (data: extraAddParam) => {
    const res = await creatActivityDetail({ ...data, activity_id: query?.activity_id });
    feedBack(res, '增加成功！', '增加失败');
    sendApi();
  };

  return (
    <>
      <PageContainer title={activity?.activity_name} breadcrumb={{ routes }} onBack={() => {
        history.push('/activityCentre/activityLook');
      }}>
        <Card>
          {/*<Row className="theme-margin-bottom">*/}
          {/*  <Col span={8}>*/}
          {/*    <Search placeholder="输入搜索内容" onSearch={onSearch} style={{ width: 200 }} allowClear/>*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Row className="theme-margin-bottom">
            <Col span={5}>
              <CommonSearch sendApi={sendApi}/>
            </Col>
            <Col span={3}>
              <UpLoadFile senApi={(file) => activityDetailUpload({ file, activity_id: query?.activity_id })} freshData={sendApi}/>
            </Col>
            <Col span={5}>
              <AddForm buttonString="添加一条" formData={AddForms} onFinish={onAddSubmit}/>
            </Col>
          </Row>
          <Table loading={loading} dataSource={dataSource || []} pagination={false} columns={columns}
                 rowKey={record => Number(record.activity_id)}/>
          <div className="my-common-pagination">
            <Pagination
              total={total}
              onChange={handleChange}
              current={current}
              pageSizeOptions={['10', '20', '30']}
              defaultPageSize={pageSize}
              showSizeChanger
              showQuickJumper
              showTotal={(t: number) => `Total ${t} items`}
            />
          </div>
        </Card>
      </PageContainer>
      {/*</PageHeader>*/}
    </>
  );
};

export default ActivityDetail;
