import React from 'react';
import { Breadcrumb, Button, Card, Col, Form, Modal, Row } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import {  studentInfoUpload } from '@/services/upload';
import { Code } from '@/types';
import { FileProps } from '@/pages/upload/constants';

const { Dragger } = Upload;
const ScoreUpload: React.FC = () => {
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = debounce(async (values: any) => {
    const res = await studentInfoUpload({
      file: values?.file[0]?.originFileObj,
    });
    if (res.status === Code.SuccessCode) {
      Modal.success({
        content: '提交成功',
      });
    } else {
      Modal.error({
        content: res?.msg || '提交失败',
      });
    }
  }, 16);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    Modal.error({
      content: '提交失败' + errorInfo?.errorFields[0].errors,
    });
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>上传</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">学生信息导入</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card className="theme-card">
        <Form
          name="basic"
          initialValues={{ semester: '01' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="file"
            valuePropName="fileList"
            // 如果没有下面这一句会报错
            getValueFromEvent={normFile}
            rules={[{ required: true, message: '请上传文件！' }]}
          >
            {/*<ExcelUpload/>*/}
            <Dragger {...FileProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined/>
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Col span={8} offset={7}>
                <Button type="primary" className="theme-middle" htmlType="submit">
                  提交
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ScoreUpload;
