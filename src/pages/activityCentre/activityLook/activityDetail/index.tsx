// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Pagination,
  Popconfirm,
  Row,
  Table,
} from 'antd';

import { dateChange } from '@/utils/dateChange';
import _ from 'lodash';
import { useModel } from '@@/plugin-model/useModel';
import { PageContainer } from '@ant-design/pro-layout';
import { useHistory } from 'umi';

export type TableListItem = {
  activity_name?: string
  category_name?: string
  publisher_number?: string
  publisher_name?: string
  sign_up_start_time?: number
  sign_up_end_time?: number
  activity_start_time?: number
  activity_end_time?: number
  status?: number
};
import { Input, Space } from 'antd';

const { Search } = Input;
const ActivityDetail = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const activity = query;
  const firstPage = useState(1)[0];
  const firstPageSize = useState(10)[0];
  const { pageSize, getDetailList, current, total, dataSource, loading, setCurrent, setPageSize, setSearch } = useModel('detailCommon');
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
      render: (accord: API.ActivityDetailListRes) => <>{dateChange(accord?.add_date)}</>,
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
            title="Are you sure to delete this user?"
            onConfirm={() => {
              // deleteClick(record);
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
  const onSearch = (value: string) => {
    setSearch(value);
    if (value) {
      sendApi({ info: value });
    } else {
      sendApi();
    }
  };
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

  return (
    <>
      <PageContainer title={activity?.activity_name} breadcrumb={{ routes }} onBack={() => {
        history.push('/activityCentre/activityLook');
      }}>
        <Card>
          <Row className="theme-margin-bottom">
            <Col span={8}>
              <Search placeholder="输入搜索内容" onSearch={onSearch} style={{ width: 200 }} allowClear/>
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
