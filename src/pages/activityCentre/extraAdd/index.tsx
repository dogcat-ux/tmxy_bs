// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize } from '@/types';
import { extraAddListResItem, extraAddParam } from '@/services/extraAdd/data';
import { Card, Col, DatePicker, Input, Row } from 'antd';
import _ from 'lodash';
import { toTimeStamp } from '@/utils/dateChange';
import { extraAdd, extraAmend, extraDelete } from '@/services/extraAdd';
import feedBack from '@/utils/apiFeedback';
import { useModel } from '@@/plugin-model/useModel';
import AddForm from '@/components/addForm';

const columns = [
  {
    title: '加分类型',
    dataIndex: 'add_score_category',
    key: 'add_score_category',
  },
  {
    title: '类型说明',
    dataIndex: 'add_score_content',
    key: 'add_score_content',
  },
  {
    title: '加分人数',
    dataIndex: 'total',
    key: 'total',
    render: (accord: extraAddListResItem) => <>{accord}人</>,
  },
  {
    title: '创建时间',
    key: 'created_at',
    render: (accord: extraAddListResItem) => <>{dateChange(accord?.created_at)}</>,
  },
];
export default () => {
  const { dataSource, loading, getExtraAddList, setTimeInfo, timeInfo } = useModel('extraAdd');
  const { current, pageSize, editData } = useModel('commonTable');
  const [item, setItem] = useState<any>();
  const forms = [
    {
      label: '加分类型',
      name: 'add_score_category',
      rules: [{ required: true }],
      initialValue: item?.add_score_category,
      children: <Input/>,
      // children: (<Select>
      //   {
      //     extraCategorys?.map((value: API.TypeResItem, index: number) => <Option key={index}>
      //       {value.category}
      //     </Option>)
      //   }
      // </Select>),
    },
    {
      label: '类型说明',
      name: 'add_score_content',
      rules: [{ required: true }],
      initialValue: item?.add_score_content,
      children: <Input/>,
    },
    // {
    //   label: '创建时间',
    //   name: 'created_at',
    //   rules: [{ required: true }],
    //   initialValue: timeStampToMoement(editData?.created_at),
    //   // children: <><DatePicker showTime/></>,
    //   children: <DatePicker showTime/>,
    // },
  ];
  const AddForms = [
    {
      label: '加分类型',
      name: 'add_score_category',
      rules: [{ required: true }],
      children: <Input/>,
    },
    {
      label: '类型说明',
      name: 'add_score_content',
      rules: [{ required: true }],
      children: <Input/>,
    },
  ];
  const sendApi = async (body?: any) => {
    const parms = {
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getExtraAddList({ ...parms });
  };
  const datesOk = async (val: any) => {
    const v = _.cloneDeep(val);
    setTimeInfo(toTimeStamp(v));
    await sendApi({
      time_stamp: toTimeStamp(v),
    });
  };
  const datesChange = async (value: any) => {
    if (!value) {
      setTimeInfo(undefined);
      await sendApi();
    }
  };
  const onEditSubmit = async (data: extraAddParam) => {
    const res = await extraAmend(editData?.extra_add_id, { ...data });
    feedBack(res, '修改成功！', '修改失败');
    sendApi();
  };
  const onAddSubmit = async (data: extraAddParam) => {
    const res = await extraAdd({ ...data });
    feedBack(res, '增加成功！', '增加失败');
    sendApi();
  };
  useEffect(() => {
    getExtraAddList({
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
    });
  }, []);
  return (
    <PageContainer>
      <Card>
        <Row className="theme-margin-bottom">
          <Col span={5}>
            <DatePicker showTime onChange={datesChange} onOk={datesOk}/>
          </Col>
          <Col span={8}>
            <AddForm formData={AddForms} onFinish={onAddSubmit} buttonString="新建加分类型"/>
            {/*<Button type="primary">增加类型</Button>*/}
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={getExtraAddList}
                     body={timeInfo ? { time_stamp: timeInfo } : null}
                     isAction url={'/activityCentre/extraAddDetail'} formData={forms} onFinish={onEditSubmit}
                     onAmend={(record) => {
                       setItem(record);
                     }}
                     deleteApi={(record: any) => extraDelete(record.extra_add_id)}/>
      </Card>
    </PageContainer>
  )
    ;
};
