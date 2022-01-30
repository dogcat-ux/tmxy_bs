// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize } from '@/types';
import { Card, InputNumber, Popconfirm, Space, Input, Select } from 'antd';
import feedBack from '@/utils/apiFeedback';
import CommonRow from '@/components/commonRow';
import { useHistory } from 'umi';
import { createAllScore, detailDelete } from '@/services/userCentre';
import { useModel } from '@@/plugin-model/useModel';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from '@ant-design/icons/lib';

const ActivityScore = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const { dataSource, loading, getList, timeInfo, extraDetailAmend } = useModel('userAddScore');
  const { getExtraCategorys, extraCategorys } = useModel('commonTypes');
  const { current, pageSize } = useModel('commonTable');
  const [isAmended, setIsAmended] = useState(false);
  const [ID, setID] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const sendApi = async (body?: any) => {
    const parms = {
      type: 2,
      stu_number: query?.stu_number,
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    };
    getList({ ...parms });
  };
  const columns = [
    {
      title: '得分名称',
      dataIndex: 'score_title',
      key: 'score_title',
    },
    {
      title: '得分类型',
      dataIndex: 'score_category',
      key: 'score_category',
    },
    {
      title: '所得分数',
      dataIndex: 'score',
      key: 'score',
      // render: (text: any) => <>{text}分</>,
      render: (scoreNow: number, record: any, index: number) => <>{isAmended && ID === index ?
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
                                  extraDetailAmend({
                                    id: record?.id, type: 2, score,
                                    stu_number: query?.stu_number,
                                  });
                                  // sendApi();
                                  setTimeout(()=>{
                                    sendApi();
                                  },1000)
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
      title: '得分日期',
      key: 'add_date',
      render: (text: any, accord: API.allScoreDetailResItem) =>
        <>{dateChange(accord?.add_date)}</>
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
              const res = await detailDelete({
                id: record?.id
                , type: 2,
              });
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
      label: '加分类型',
      name: 'score_category',
      rules: [{ required: true }],
      // @ts-ignore
      children: (
        <Select defaultValue='' style={{ width: 120 }}>
          {
            extraCategorys?.map((value, index: number) => {
              // @ts-ignore
              return <Option value={value.id} key={index}>{value.category}</Option>;
            })
          }
        </Select>
      ),
      // children: <CommonSelect defaultValue="" items={categorys?.map(value=>value.category_name)||[]} sendApi={(data) => {console.log(data);}}/>,
    },
    {
      label: '加分原因',
      name: 'score_result',
      rules: [{ required: true }],
      // children: <Button onClick={()=>{
      //   Modal.info({
      //     content:(<div></div>)
      //   })
      // }}/>,
      children: (<Input/>),
    },
    {
      label: '所得分数',
      name: 'score',
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
  ];
  const onAddSubmit = async (data: API.CreateAllScoreParam) => {
    const res = await createAllScore({ ...data, type: 2, stu_number: query?.stu_number });
    feedBack(res, '增加成功！', '增加失败');
    sendApi();
  };
  const routes = [
    {
      path: '',
      breadcrumbName: '个人中心',
    },
    {
      path: '',
      breadcrumbName: query?.stu_number,
    },
    {
      path: '',
      breadcrumbName: '额外加分',
    },
  ];
  useEffect(() => {
    sendApi();
    getExtraCategorys(1);
  }, []);
  return (
    <PageContainer title='额外加分' breadcrumb={{ routes }} onBack={() => {
      history.push('/userCentre');
    }}>
      <Card>
        <CommonRow sendApi={sendApi} isCategory={false} isAdd isGrade={false} formData={AddForms}
                   onFinish={onAddSubmit}/>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo } : null}/>
      </Card>
    </PageContainer>
  )
    ;
};
export default ActivityScore;
