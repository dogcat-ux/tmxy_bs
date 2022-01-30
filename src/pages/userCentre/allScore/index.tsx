// @ts-ignore
import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { firstPage, firstPageSize, TYPE, TYPE_MAP, TYPE_MAP2 } from '@/types';
import { Card, Input, InputNumber, Popconfirm, Select, Space } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import feedBack from '@/utils/apiFeedback';
import CommonRow from '@/components/commonRow';
import { useHistory } from 'umi';
import { CheckCircleTwoTone, CloseCircleTwoTone, EditTwoTone } from '@ant-design/icons/lib';
import { activityByCategory, createAllScore, detailDelete } from '@/services/userCentre';

const { Option } = Select;

const UserCenter = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const { dataSource, loading, getList, timeInfo } = useModel('userAllScore');
  const { extraDetailAmend } = useModel('userAddScore');
  const { current, pageSize } = useModel('commonTable');
  const [isAmended, setIsAmended] = useState(false);
  const [ID, setID] = useState<number>();
  const [select, setSelect] = useState<string>();
  const [select2, setSelect2] = useState<string>();
  const [localCategorys, setLocalCategorys] = useState<any>();
  const { getExtraCategorys, extraCategorys, getCategorys, categorys } = useModel('commonTypes');
  const [score, setScore] = useState<number>(0);
  const [activies, setActivies] = useState<API.activityByCategoryResItem[]>();
  const sendApi = async (body?: any) => {
    const parms = {
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
      title: '得分来源',
      dataIndex: 'score_source',
      key: 'score_source',
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
        <>{dateChange(accord?.add_date)}</>,
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
                id: record?.id, type: TYPE_MAP[record?.score_source],
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

  function handleChange(value: any) {
    console.log(`selected ${value}`);
    setSelect(TYPE_MAP2[value]);
  }

  function handleChange2(value: any) {
    setSelect2(categorys?.filter((val: any) => val.id === parseInt(value))[0]?.category_name);
  }

  const AddForms = [
    {
      label: '得分来源',
      name: 'score_source',
      rules: [{ required: true }],
      children: <Select onChange={handleChange}>
        <Option value={1}>活动加分</Option>
        <Option value={2}>额外加分</Option>
        <Option value={3}>额外减分</Option>
      </Select>,
    },
    {
      label: '得分类型',
      name: 'score_category',
      rules: [{ required: true }],
      children: <Select style={{ width: 120 }} onChange={handleChange2}>
        {
          select && localCategorys?.map((value: any) => {
            // @ts-ignore
            return <Option value={value.id} key={value.id}>{value.category_name || value.category}</Option>;
          })
        }
      </Select>,
    },
    {
      label: '得分原因(活动)',
      name: 'score_result',
      rules: [{ required: true }],
      children: select === TYPE[0] ? <Select style={{ width: 120 }}>
        {
          activies?.map((value) => {
            // @ts-ignore
            return <Option value={value.activity_name} key={value.activity_id}>{value.activity_name}</Option>;
          })
        }
      </Select> : (<Input/>)
      ,
    },
    {
      label: '分数',
      name: 'score',
      rules: [{ required: true }],
      children: <InputNumber/>,
    },
  ];
  const onAddSubmit = async (data: any) => {
    const res = await createAllScore({
      ...data,
      type: select && TYPE_MAP[select],
      stu_number: query?.stu_number,
    });
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
      breadcrumbName: '总分明细',
    },
  ];
  const CateByType = async () => {
    console.log('select', select);
    if (select === TYPE[0]) {
      getCategorys();
    } else if (select === TYPE[1]) {
      getExtraCategorys(1);
      // setLocalCategorys(extraCategorys);
    } else {
      getExtraCategorys(2);
      // setLocalCategorys(extraCategorys);
    }
  };
  const activityByCate = async () => {
    if (select2) {
      const res = await activityByCategory({ category: select2 });
      setActivies(res.data?.item);
    }
  };
  useEffect(() => {
    activityByCate();
  }, [select2]);
  useEffect(() => {
    setLocalCategorys(extraCategorys);
  }, [extraCategorys]);
  useEffect(() => {
    setLocalCategorys(categorys);
  }, [categorys]);
  useEffect(() => {
    CateByType();
  }, [select]);
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer title='总分明细' breadcrumb={{ routes }} onBack={() => {
      history.push('/userCentre');
    }}>
      <Card>
        <CommonRow sendApi={sendApi} isGrade={false} isAdd formData={AddForms} onFinish={onAddSubmit}/>
        <CommonTable columns={columns} dataSource={dataSource} loading={loading} sendApi={sendApi}
                     body={timeInfo ? { time_stamp: timeInfo } : null}/>
      </Card>
    </PageContainer>
  )
    ;
};
export default UserCenter;
