import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/other/carousel/index.less';
import { Card, Col, Input, Popconfirm, Row, Space } from 'antd';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { creatNotice, deleteNotice, getNotice } from '@/services/notice';
import { Typography } from 'antd';
import feedBack from '@/utils/apiFeedback';
import { useHistory } from 'umi';
import AddForm from '@/components/addForm';
import { useModel } from '@@/plugin-model/useModel';

const { Paragraph } = Typography;
const { TextArea } = Input;
const TheNotice = () => {
  const history = useHistory();
  const { setTotal } = useModel('commonTable');
  const [dataSource, setDataSource] = useState<API.noticeResItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const sendApi = async () => {
    setLoading(true);
    const { data } = await getNotice();
    setLoading(false);
    setDataSource(data?.item);
    setTotal(data?.total || 0);
  };
  const columns = [
    {
      title: '公告标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '公告内容',
      dataIndex: 'content',
      key: 'content',
      width: 650,
      render: (text: string) =>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {text}
        </Paragraph>,
    },
    {
      title: '创建日期',
      key: 'created_at',
      width: 200,
      render: (text: any, accord: API.noticeResItem) => <>{dateChange(accord?.created_at)}</>
      ,
    },
    {
      title: '操作',
      // key: 'extra_add_id',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            history.push({
              pathname: '/other/noticeDetail',
              query: { ...record },
            });
          }}
          >
            查看
          </a>
          <Popconfirm
            title="确定删除吗?"
            onConfirm={async () => {
              feedBack(await deleteNotice(record?.id), '删除成功', '删除失败');
              sendApi();
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
      label: '公告标题',
      name: 'title',
      rules: [{ required: true }],
      children: <Input/>,
    },
    {
      label: '公告内容',
      name: 'content',
      rules: [{ required: true }],
      children: (
        <TextArea autoSize={{ minRows: 4, maxRows: 5 }}/>
      ),
    },
  ];
  const onAddSubmit = async (data: any) => {
    const res = await creatNotice({ ...data });
    feedBack(res, '增加成功！', '增加失败');
    sendApi();
  };
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <PageContainer>
      <Card className={styles.scoped}>
        <Row className="theme-margin-bottom">
          <Col span={5}>
            <AddForm buttonString="添加一条" formData={AddForms} onFinish={onAddSubmit}/>
          </Col>
        </Row>
        <CommonTable columns={columns} dataSource={dataSource || []} loading={loading} sendApi={sendApi}
                     isAction={false}/>
      </Card>
    </PageContainer>
  );
};

export default TheNotice;
