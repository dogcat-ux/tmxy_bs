import React from 'react';
import { Breadcrumb, Button, Card, DatePicker, Form, message, Select } from 'antd';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { FileProps } from '@/pages/upload/constants';
import { debounce } from 'lodash';
import { gpaUpload } from '@/services/upload';
import { Code } from '@/types';

const { Dragger } = Upload;
const GpaUpload: React.FC = () => {
  const normFile = (e: any) => { //如果是typescript, 那么参数写成 e: any
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = debounce(async (values: any) => {
    console.log('valuesvaluesvalues', values);
    const res = await gpaUpload({
      year: values.year.year().toString(),
      semester: values.year.year().toString() + values.semester,
      file: values?.file[0]?.originFileObj,
    });
    if (res?.status === Code.SuccessCode) {
      message.success('提交成功！');
    } else {
      message.success('提交失败！');
    }
  }, 16);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败！' + errorInfo?.errorFields[0].errors);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>上传</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">绩点上传</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card className="theme-card">
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 8 }}
          initialValues={{ semester: '01' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="学年"
            name="year"
            rules={[{ required: true, message: '请输入学年！' }]}
          >
            <DatePicker style={{ width: 140 }} picker="year"/>
          </Form.Item>

          <Form.Item
            label="学期"
            name="semester"
            rules={[{ required: true, message: '请输入学期！' }]}
          >
            <Select style={{ width: 140 }}>
              {/*// @ts-ignore*/}
              <Option value="01">01</Option>
              {/*// @ts-ignore*/}
              <Option value="02">02</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="学生绩点文件(.xlsx)"
            name="file"
            valuePropName="fileList"
            // 如果没有下面这一句会报错
            getValueFromEvent={normFile}
            rules={[{ required: true, message: '请上传学生绩点文件！' }]}
          >
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

          <Form.Item wrapperCol={{ offset: 5, span: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default GpaUpload;
