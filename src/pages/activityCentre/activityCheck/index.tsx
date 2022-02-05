// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Card, Col, Input, InputNumber, Modal, Row, Select, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { dateChange, toTimeStamp } from '@/utils/dateChange';
import { DatePicker } from 'antd';
import _ from 'lodash';
import { useModel } from '@@/plugin-model/useModel';
import { checkState } from '@/utils/typeJudge';
import { CHECK_TYPE, CHECK_TYPE2 } from '@/types';
import CommonTable from '@/components/CommonTable';
import { amendActivity, checkActivity, deleteActivity } from '@/services/activityModule';
import feedBack from '@/utils/apiFeedback';
import moment from 'moment';

const { Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const ActivityCheck = () => {
  const firstPage = useState(1)[0];
  const firstPageSize = useState(10)[0];
  const { categorys, getCategorys, dataSource, loading, getList, category1, activityTimeInfo, setCategory1, setActivityTimeInfo } = useModel('common');
  const { current, pageSize, editData } = useModel('commonTable');
  const data1 = category1 ? { category_name: category1 } : {};
  const data2 = activityTimeInfo ? {
    activity_start_time: activityTimeInfo.startTime,
    activity_end_time: activityTimeInfo.endTime,
  } : {};
  const sendApi = async (body?: any) => {
    const parms = {
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getList(0, parms);
  };
  const checkChange = async (val: string, record: API.ActivityRes) => {
    if (val === CHECK_TYPE[0]) {
      Modal.error({
        content: '不能修改状态为审核中！',
      });
    } else {
      const res = await checkActivity(record?.activity_id, { status: CHECK_TYPE2[val] });
      feedBack(res, '审核状态修改成功', '审核状态修改失败');
      await sendApi();
    }
  };
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'activity_name',
      key: 'activity_name',
      width: 100,
    },
    {
      title: '审核状态',
      key: 'status',
      width: 150,
      //0 申请中     1 申请通过    2 申请失败
      render: (text: string, record: API.ActivityRes) => <>
        <Select defaultValue={checkState(record)} style={{ width: 120 }} onChange={(val: any) => {
          checkChange(val, record);
        }}>
          {/*<Option value='审核中'>审核中</Option>,*/}
          <Option value="审核通过">审核通过</Option>,
          <Option value="审核失败">审核失败</Option>,
        </Select>
      </>,
    },
    {
      title: '活动类型',
      dataIndex: 'category_name',
      key: 'category_name',
      width: 100,
    },
    {
      title: '主办方',
      dataIndex: 'activity_unit',
      key: 'activity_unit',
      width: 100,
    },
    {
      title: '活动内容',
      dataIndex: 'content',
      key: 'content',
      width: 200,
      render: (text: string) =>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {text}
        </Paragraph>,
    },
    {
      title: '活动地点',
      dataIndex: 'activity_place',
      key: 'activity_place',
      width: 100,
    },
    {
      title: '基础分数',
      dataIndex: 'basic_score',
      key: 'basic_score',
      width: 100,
    },
    {
      title: '签到码',
      dataIndex: 'code',
      key: 'code',
      width: 100,
    },
    {
      title: '签到地点',
      dataIndex: 'sign_in_place',
      key: 'sign_in_place',
      width: 100,
    },
    {
      title: '签到范围(米)',
      dataIndex: 'sign_in_range',
      key: 'sign_in_range',
      width: 100,
    },
    {
      title: '招募人数',
      dataIndex: 'recruitment',
      key: 'recruitment',
      width: 100,
      render: (accord: API.ActivityRes) => <>{accord}人</>,
    },
    {
      title: '负责人',
      dataIndex: 'responsible_people',
      key: 'responsible_people',
      width: 100,
    },
    {
      title: '负责联系方式',
      dataIndex: 'responsible_people_phone',
      key: 'responsible_people_phone',
      width: 100,
    },
    {
      title: '报名时间',
      key: 'activity_id',
      width: 200,
      render: (accord: API.ActivityRes) => <>{dateChange(accord?.sign_up_start_time)}~<br/>{dateChange(accord?.sign_up_end_time)}</>,
    },
    {
      title: '活动时间',
      key: 'activity_id',
      width: 200,
      render: (accord: API.ActivityRes) => <>{dateChange(accord?.activity_start_time)}~<br/>{dateChange(accord?.activity_end_time)}</>,
    },
  ];
  const forms = [
    {
      label: '活动名称',
      name: 'activity_name',
      rules: [{ required: true }],
      initialValue: editData?.activity_name,
      // @ts-ignore
      children: (
        <Input/>
      ),
      // children: <CommonSelect defaultValue="" items={categorys?.map(value=>value.category_name)||[]} sendApi={(data) => {console.log(data);}}/>,
    },
    {
      label: '活动类型',
      name: 'category_name',
      rules: [{ required: true }],
      initialValue: editData?.category_name,
      // @ts-ignore
      children: (
        <Select style={{ width: 120 }}>
          {
            categorys?.map((value, index: number) => {
              // @ts-ignore
              return <Option value={value.id} key={index}>{value.category_name}</Option>;
            })
          }
        </Select>
      ),
      // children: <CommonSelect defaultValue="" items={categorys?.map(value=>value.category_name)||[]} sendApi={(data) => {console.log(data);}}/>,
    },
    {
      label: '审核状态',
      name: 'status',
      rules: [{ required: true }],
      //0 申请中     1 申请通过    2 申请失败
      children: <Select defaultValue={checkState(editData?.status)} style={{ width: 120 }}>
        {/*<Option value='审核中'>审核中</Option>,*/}
        <Option value={1}>审核通过</Option>,
        <Option value={2}>审核失败</Option>,
      </Select>,
    },
    {
      label: '主办方',
      name: 'activity_unit',
      rules: [{ required: true }],
      initialValue: editData?.activity_unit,
      children: (
        <Input/>
      ),
    },
    {
      label: '活动内容',
      name: 'content',
      rules: [{ required: true }],
      initialValue: editData?.content,
      children: (
        <Input/>
      ),
    },
    {
      label: '活动地点',
      name: 'activity_place',
      rules: [{ required: true }],
      initialValue: editData?.activity_place,
      children: (
        <Input disabled/>
      ),
    },
    {
      label: '招募人数',
      name: 'recruitment',
      initialValue: editData?.recruitment,
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
    {
      label: '基础分数',
      name: 'basic_score',
      initialValue: editData?.basic_score,
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
    {
      label: '签到地点',
      name: 'sign_in_place',
      initialValue: editData?.sign_in_place,
      rules: [{ required: true }],
      children: <Input disabled/>,
    },
    {
      label: '签到范围(米)',
      name: 'sign_in_range',
      initialValue: editData?.sign_in_range,
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
    {
      label: '负责人',
      name: 'responsible_people',
      initialValue: editData?.responsible_people,
      rules: [{ required: true }],
      children: <Input/>,
    },
    {
      label: '负责人联系方式',
      name: 'responsible_people_phone',
      initialValue: editData?.responsible_people_phone,
      rules: [{ required: true }, {
        pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        message: '请输入正确格式的手机号码',
      }],
      children: <Input/>,
    },
    {
      label: '报名时间',
      name: 'signTime',
      initialValue: [moment(dateChange(editData?.sign_up_start_time)), moment(dateChange(editData?.sign_up_end_time))],
      rules: [{ required: true }],
      children: <RangePicker showTime={{ format: 'HH:mm' }} allowClear format="YYYY-MM-DD HH:mm"/>,
    },
    {
      label: '活动时间',
      name: 'activeTime',
      initialValue: [moment(dateChange(editData?.activity_start_time)), moment(dateChange(editData?.activity_end_time))],
      rules: [{ required: true }],
      children: <RangePicker showTime={{ format: 'HH:mm' }} allowClear format="YYYY-MM-DD HH:mm"/>,
    },
  ];
  const amendSubmit = async (data: any) => {
    const res = await amendActivity(editData?.activity_id, {
      ...data,
      sign_up_start_time: toTimeStamp(data?.signTime[0]),
      sign_up_end_time: toTimeStamp(data?.signTime[1]),
      activity_start_time: toTimeStamp(data?.activeTime[0]),
      activity_end_time: toTimeStamp(data?.activeTime[1]),
    });
    feedBack(res, '修改成功', '修改失败');
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
    sendApi();
    getCategorys();
  }, []);
  useEffect(() => {
    console.log('editData', editData);
  }, [editData]);

  return (
    <>
      <PageContainer>
        <Card>
          <Row className="theme-margin-bottom">
            <Col span={8}>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
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
          <CommonTable columns={columns} dataSource={dataSource}
                       loading={loading} sendApi={sendApi}
                       isAction={true}
                       formData={forms}
                       onFinish={amendSubmit}
                       isLook={false}
                       deleteApi={(record: any) => deleteActivity(record?.activity_id)}/>
        </Card>
      </PageContainer>
    </>
  );
};

export default ActivityCheck;
