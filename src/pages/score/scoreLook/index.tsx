import {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Col, Row} from 'antd';
import CommonTable from "@/components/CommonTable";
import {useModel} from "@@/plugin-model/useModel";
import {scoreDelete, scorePost} from "@/services/score";

const Score = () => {
  const {setTotal,pageSize,current} = useModel('commonTable');
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<API.scorePostItem[]>([])
  const sendApi = async () => {
    setLoading(true);
    // @ts-ignore
    const {data: {item, total}} = await scorePost({
      page_size: pageSize,
      page_num: current
    });
    setLoading(false)
    setTotal(total)
    // @ts-ignore
    setData(item);
  };
  const columns = [
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'score_id',
    },
    {
      title: '学号',
      dataIndex: 'stu_number',
      key: 'score_id',
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'score_id',
    },
    {
      title: '课程名',
      dataIndex: 'course_name',
      key: 'score_id',
    },
    {
      title: '学分',
      dataIndex: 'credit',
      key: 'score_id',
    },
    {
      title: '成绩',
      dataIndex: 'score',
      key: 'score_id',
    },
    {
      title: '绩点',
      dataIndex: 'gpa',
      key: 'score_id',
    },
  ];
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer>
      <Card>
        <Row className="theme-margin-bottom">
          <Col span={5}>
            {/*<AddForm formData={forms} onFinish={onAddSubmit} buttonString="添加学期"/>*/}
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={data || []} loading={loading} sendApi={sendApi}
                     isAction={true}
                     isAmend={false}
                     isDelete={true}
                     deleteApi={(record: any) => scoreDelete({id:record?.score_id})}
                     isLook={false}/>
      </Card>
    </PageContainer>
  );
};

export default Score;
