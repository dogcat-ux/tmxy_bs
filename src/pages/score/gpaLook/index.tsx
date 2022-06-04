import {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Card, Col, Row} from 'antd';
import CommonTable from "@/components/CommonTable";
import {useModel} from "@@/plugin-model/useModel";
import {gpaDelete, gpaPost} from "@/services/score";

const GPA = () => {
  const {setTotal, pageSize, current} = useModel('commonTable');
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<API.gpaPostItem[]>([])
  const sendApi = async () => {
    setLoading(true);
    // @ts-ignore
    const {data: {item, total}} = await gpaPost({
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
      key: 'gpaid',
    },
    {
      title: '学年',
      dataIndex: 'year',
      key: 'gpaid',
    },
    {
      title: '学号',
      dataIndex: 'stu_number',
      key: 'gpaid',
    },
    {
      title: '用户名',
      dataIndex: 'user_name',
      key: 'gpaid',
    },
    {
      title: '总绩点',
      dataIndex: 'all_gpa',
      key: 'gpaid',
    },
    {
      title: '总排名',
      dataIndex: 'all_gpa_rank',
      key: 'gpaid',
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
                     deleteApi={(record: any) => gpaDelete({id: record?.gpaid})}
                     isLook={false}/>
      </Card>
    </PageContainer>
  );
};
export default GPA;
