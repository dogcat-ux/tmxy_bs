import React from 'react';
import { Button, Form, Modal } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { useModel } from '@@/plugin-model/useModel';

export interface formDataItem {
  name: string,
  label: string,
  rules?: Rule[],
  initialValue?: any,
  children: any
}

interface EditFormProps {
  formData: formDataItem[],
  onFinish: (values: any) => void
}

const EditForm: React.FC<EditFormProps> = ({ formData, onFinish }) => {
  const { setEditFormVisible, editFormVisible, clear } = useModel('commonTable');
  const onFinishFailed = (errorInfo: any) => {
    Modal.error({
      content: '提交失败' + errorInfo?.errorFields[0].errors,
    });
  };
  const handleCancel = () => {
    setEditFormVisible(false);
    clear();
  };
  return (
    <>
      <Modal title="修改" footer={null} visible={editFormVisible} onCancel={handleCancel} destroyOnClose>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={(data) => {
            onFinish(data);
            clear();
          }}
          onFinishFailed={onFinishFailed}
        >
          {
            formData?.map((value, index) => {
              return <Form.Item
                key={index}
                name={value.name}
                label={value.label}
                rules={value.rules}
                initialValue={value?.initialValue}
              >
                {value.children}
              </Form.Item>;
            })
          }
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditForm;
