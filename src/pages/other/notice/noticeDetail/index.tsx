import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Input, Modal } from 'antd';
import { useHistory } from 'umi';
import { amendNotice } from '@/services/notice';
import feedBack from '@/utils/apiFeedback';

const { TextArea } = Input;
const NoticeDeatil = () => {
  const history = useHistory();
  // @ts-ignore
  const { query } = history.location;
  const routes = [
    {
      path: '',
      breadcrumbName: '活动中心',
    },
    {
      path: '',
      breadcrumbName: '额外加分',
    },
    {
      path: '',
      breadcrumbName: query?.title,
    },
  ];
  const onFinishFailed = (errorInfo: any) => {
    Modal.error({
      content: '提交失败' + errorInfo?.errorFields[0].errors,
    });
  };
  const onFinish = async (data: any) => {
    feedBack(await amendNotice(query?.id, { ...data }),"修改成功","修改失败");
  };
  return (
    <PageContainer title={query?.title} breadcrumb={{ routes }} onBack={() => {
      history.push('/activityCentre/extraAdd');
    }}>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="公告标题"
            name="title"
            rules={[{ required: true, message: '请输入标题!' }]}
            initialValue={query?.title}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="公告内容"
            name="content"
            rules={[{ required: true, message: '请输入内容!' }]}
            initialValue={query?.content}
          >
            <TextArea autoSize={{ minRows: 4, maxRows: 5 }}/>
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default NoticeDeatil;
