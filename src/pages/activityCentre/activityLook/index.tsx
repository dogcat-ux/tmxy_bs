// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Card, Col, Pagination, Popconfirm, Row, Select, Space, Table } from 'antd';

import { PageContainer } from '@ant-design/pro-layout';
import { dateChange } from '@/utils/dateChange';
import { DatePicker } from 'antd';
import _ from 'lodash';
import { useHistory } from 'umi';
import { activeState } from '@/utils/typeJudge';
import AmendForm from '@/components/amendForm';
import { useModel } from '@@/plugin-model/useModel';
// import { history } from 'umi';

const { Option } = Select;
const { RangePicker } = DatePicker;
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
const ActivityLook = () => {
  const history = useHistory();
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [editAccount, setEditAccount] = useState<API.ActivityRes>({});
  const firstPage = useState(1)[0];
  const firstPageSize = useState(10)[0];
  const { categorys, pageSize, getCategorys, current, total, dataSource, loading, setCurrent, setPageSize, getList, category1, activityTimeInfo, setCategory1, setActivityTimeInfo } = useModel('common');
  const data1 = category1 ? { category_name: category1 } : {};
  const data2 = activityTimeInfo ? {
    activity_start_time: activityTimeInfo.startTime,
    activity_end_time: activityTimeInfo.endTime,
  } : {};
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'activity_name',
      key: 'activity_name',
    },
    {
      title: '活动状态',
      key: 'activity_id',
      render: (accord: API.ActivityRes) => <>{activeState(accord)}</>,
    },
    {
      title: '活动类型',
      dataIndex: 'category_name',
      key: 'category_name',
    },
    {
      title: '招募人数',
      dataIndex: 'recruitment',
      key: 'recruitment',
      render: (accord: API.ActivityRes) => <>{accord}人</>,
    },
    {
      title: '负责人',
      dataIndex: 'responsible_people',
      key: 'responsible_people',
    },
    {
      title: '报名时间',
      key: 'activity_id',
      render: (accord: API.ActivityRes) => <>{dateChange(accord?.sign_up_start_time)}~<br/>{dateChange(accord?.sign_up_end_time)}</>,
    },
    {
      title: '活动时间',
      key: 'activity_id',
      render: (accord: API.ActivityRes) => <>{dateChange(accord?.activity_start_time)}~<br/>{dateChange(accord?.activity_end_time)}</>,
    },
    {
      title: '操作',
      key: 'action',
      render: (record: API.ActivityRes) => (
        <Space size="middle">
          <a onClick={() => {
            // @ts-ignore
            history.push({
              pathname: '/activityCentre/activityDetail', query: {
                ...record,
              },
            });
          }}>查看</a>
          <a
            onClick={() => {
              setEditFormVisible(true);
              setEditAccount(record);
            }}
          >
            修改
          </a>
          <Popconfirm
            title='Are you sure to delete this user?'
            onConfirm={() => {
              // deleteClick(record);
            }}
            okText='Yes'
            cancelText='No'
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleEditCancel = () => {
    setEditFormVisible(false);
  };
  const handleEditSubmit = async (value: API.ActivityRes) => {
    // const data =
    //   userLevel === '3'
    //     ? { ...value, id: editAccount?.id }
    //     : {
    //       password: value.password,
    //       id: editAccount?.id,
    //     };
    // const res = await updateUser(data);
    // if (res.code === 0) {
    //   message.success(res.msg || 'Success to edit！');
    //   setEditFormVisible(false);
    //   getList({
    //     page: current || 1,
    //     limit: pageSize || 10,
    //     startTime: timeInfo?.startTime,
    //     endTime: timeInfo?.endTime,
    //   });
    // } else {
    //   message.error(res.msg || 'Fail to edit！');
    // }
  };

  const sendApi = async (body?: any) => {
    const parms = {
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getList(parms);
  };
  const handleChange = async (page?: number, ps?: number) => {
    setCurrent(page || firstPage);
    setPageSize(ps || firstPageSize);
    await sendApi({
      page_num: page || firstPage,
      page_size: ps || firstPageSize,
    });
  };
  const selectChange = async (val: string) => {
    if (val !== '全部分类') {
      setCategory1(val);
      await sendApi({ category_name: val, ...data2 });
    } else {
      setCategory1('');
      await sendApi({ ...data2 });
    }
  };
  const datesOk = async (val: any) => {
    const v = _.cloneDeep(val);
    if (v[0] && v[1]) {
      // v[0].subtract(8, ' hours').set({ second: 0 });
      // v[1].subtract(8, ' hours').set({ second: 0 });
      setActivityTimeInfo({
        startTime: v[0]?.unix(),
        endTime: v[1]?.unix(),
      });
      await sendApi({
        activity_start_time: v[0].unix(),
        activity_end_time: v[1].unix(),
        ...data1,
      });
    }
  };
  const datesChange = async (value: any) => {
    if (!value) {
      setActivityTimeInfo(undefined);
      await sendApi({ ...data1 });
    }
  };
  useEffect(() => {
    Promise.all([sendApi(), getCategorys()]);
  }, []);

  return (
    <>
      <PageContainer>
        <Card>
          <Row className="theme-margin-bottom">
            <Col span={8}>
              <RangePicker
                showTime={{ format: ' HH:mm' }}
                allowClear
                format="YYYY-MM-DD HH:mm"
                onOk={datesOk}
                onChange={datesChange}
              />
            </Col>
            <Col span={8}>
              {/*// @ts-ignore*/}
              <Select defaultValue="全部分类" style={{ width: 120 }}
                      onChange={selectChange}>
                <Option value="全部分类">全部分类</Option>,
                {
                  categorys?.map((value: API.categoryItem) =>
                    <Option value={value.category_name} key={value.id}>{value.category_name}</Option>,
                  )
                }
              </Select>
            </Col>
          </Row>
          <Table onRow={(record) => {
            return {
              // onClick: () => {
              //   // @ts-ignore
              //   history.push({
              //     pathname: '/activityCentre/activityDetail', query: {
              //       ...record,
              //     },
              //   });
              // },
            };
          }}
                 loading={loading} dataSource={dataSource || []} pagination={false} columns={columns}
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
          <AmendForm
            handleCancel={handleEditCancel}
            visible={editFormVisible}
            items={editAccount}
            handleSubmit={handleEditSubmit}
          />;
        </Card>
      </PageContainer>
    </>
  );
};

export default ActivityLook;
