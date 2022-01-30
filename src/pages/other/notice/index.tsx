import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from '@/pages/other/carousel/index.less';
import { Card, Input } from 'antd';
import CommonTable from '@/components/CommonTable';
import { dateChange } from '@/utils/dateChange';
import { getNotice } from '@/services/notice';
import { Typography } from 'antd';

const { Paragraph } = Typography;
const { TextArea } = Input;
const TheNotice = () => {
  const [dataSource, setDataSource] = useState<API.noticeResItem[]>();
  const [loading, setLoading] = useState<boolean>(false);
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
      render: (text: any, accord: API.allScoreDetailResItem) =>
        <>{dateChange(accord?.add_date)}</>
      ,
    },
  ];
  const formData = [
    {
      name: 'title',
      label: '公告标题',
      rules: [{ required: true }],
      children: (<Input/>),
    },
    {
      name: 'content',
      label: '公告内容',
      rules: [{ required: true }],
      children: (<TextArea rows={4}/>),
    },
  ];
  const sendApi = async () => {
    setLoading(true);
    const { data } = await getNotice();
    setLoading(false);
    setDataSource(data?.item);
  };
  useEffect(() => {
    sendApi();
  }, []);
  return (
    <div>
      <PageContainer>
        <Card className={styles.scoped}>
          <CommonTable columns={columns} dataSource={dataSource || []} loading={loading} sendApi={sendApi}
                       isAction={true} formData={formData}/>
        </Card>
      </PageContainer>
    </div>
  );
};

export default TheNotice;
