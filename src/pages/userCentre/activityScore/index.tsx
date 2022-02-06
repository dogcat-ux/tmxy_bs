// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize, TYPE_MAP } from '@/types';
import { Card, InputNumber, Popconfirm, Space, Select } from 'antd';
import feedBack from '@/utils/apiFeedback';
import CommonRow from '@/components/commonRow';
import { useHistory } from 'umi';
import { activityByCategory, createAllScore, detailDelete } from '@/services/userCentre';
import { useModel } from '@@/plugin-model/useModel';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from '@ant-design/icons/lib';

const ActivityScore = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const { dataSource, loading, getList, timeInfo, extraDetailAmend } = useModel('userAddScore');
  const { current, pageSize } = useModel('commonTable');
  const [select, setSelect] = useState<string>();
  const [activies, setActivies] = useState<API.activityByCategoryResItem[]>();
  const { getCategorys, categorys } = useModel('commonTypes');
  const [isAmended, setIsAmended] = useState(false);
  const [ID, setID] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const sendApi = async (body?: any) => {
    const parms = {
      type: 1,
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
      // render: (scoreNow: number, record: any, index: number) => <>{isAmended && ID === index ?
      //   (
      //     <>
      //       <InputNumber style={{ width: 100 }} defaultValue={Number(scoreNow).toFixed(2)} value={score.toString()}
      //                    onChange={(value) => {
      //                      setScore(Number(value));
      //                    }}/>&nbsp;
      //       <CloseCircleTwoTone style={{ fontSize: 20 }} onClick={() => {
      //         setIsAmended(!isAmended);
      //       }}/>&nbsp;
      //       <CheckCircleTwoTone style={{ fontSize: 20 }}
      //                           onClick={() => {
      //                             setIsAmended(!isAmended);
      //                             extraDetailAmend({
      //                               id: record?.id, type: 1, score,
      //                               stu_number: query?.stu_number,
      //                             });
      //                             // sendApi();
      //                             setTimeout(() => {
      //                               sendApi();
      //                             }, 1000);
      //                           }}
      //       /></>
      //   ) :
      //   (<>
      //     <span>{scoreNow}</span>
      //     < EditTwoTone style={{ fontSize: 20 }} onClick={() => {
      //       setIsAmended(!isAmended);
      //       setScore(scoreNow);
      //       setID(index);
      //     }}/>
      //   </>)
      // }
      // </>,
      render: (scoreNow: number, record: any, index: number) => <>{isAmended && ID === index ?
        (
          <>
            <InputNumber style={{ width: 100 }} defaultValue={Number(scoreNow).toFixed(2)} value={score.toString()} onChange={(value) => {
              setScore(Number(value));
            }}/>&nbsp;
            <CloseCircleTwoTone style={{ fontSize: 20 }} onClick={() => {
              setIsAmended(!isAmended);
            }}/>&nbsp;
            <CheckCircleTwoTone style={{ fontSize: 20 }}
                                onClick={() => {
                                  setIsAmended(!isAmended);
                                  extraDetailAmend({
                                    id: record?.id, type: TYPE_MAP[record.score_source], score,
                                    stu_number: query?.stu_number,
                                  });
                                  // sendApi();
                                  setTimeout(() => {
                                    sendApi();
                                  }, 1000);
                                }}
            /></>
        ) :
        (<>
          <span>{Number(scoreNow).toFixed(2)}</span>
          < EditTwoTone style={{ fontSize: 20 }} onClick={() => {
            setIsAmended(!isAmended);
            setScore(Number(Number(scoreNow).toFixed(2)));
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
                id: record?.id, type: 1,
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
  const activityByCate = async () => {
    if (select) {
      const res = await activityByCategory({ category: select });
      setActivies(res.data?.item);
    }
  };
  useEffect(() => {
    activityByCate();
  }, [select]);
  useEffect(() => {
    getCategorys();
    // activityByCategory();
  }, []);

  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setSelect(categorys?.filter((val: any) => val.id === parseInt(value))[0]?.category_name);
  }

  const AddForms = [
    {
      label: '活动类型',
      name: 'score_category',
      rules: [{ required: true }],
      // @ts-ignore
      children: (
        <Select style={{ width: 120 }} onChange={handleChange}>
          {
            categorys?.map((value: API.categoryItem, index: number) => {
              // @ts-ignore
              return <Option value={value.id} key={index}>{value.category_name}</Option>;
            })
          }
        </Select>
      ),
      // children: <CommonSelect defaultValue="" items={categorys?.map(value=>value.category_name)||[]} sendApi={(data) => {console.log(data);}}/>,
    },
    {
      label: '得分活动',
      name: 'score_result',
      rules: [{ required: true }],
      children: (
        <Select style={{ width: 120 }}>
          {
            activies?.map((value) => {
              // @ts-ignore
              return <Option value={value.activity_name} key={value.activity_id}>{value.activity_name}</Option>;
            })
          }
        </Select>
      ),
    },
    {
      label: '所得分数',
      name: 'score',
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
  ];
  const onAddSubmit = async (data: API.CreateAllScoreParam) => {
    const res = await createAllScore({ ...data, type: 1, stu_number: query?.stu_number });
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
      breadcrumbName: '活动加分',
    },
  ];
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer title='活动加分' breadcrumb={{ routes }} onBack={() => {
      history.push('/userCentre');
    }}>
      <Card>
        <CommonRow isCategory sendApi={sendApi} isAdd isGrade={false} formData={AddForms} onFinish={onAddSubmit}/>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo } : null}/>
      </Card>
    </PageContainer>
  )
    ;
};
export default ActivityScore;
