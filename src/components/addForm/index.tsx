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

interface AddFormProps {
  formData: formDataItem[],
  onFinish: (values: any) => void,
  buttonString: string
}

const AddForm: React.FC<AddFormProps> = ({ formData, onFinish, buttonString }) => {
  const { setAddFormVisible, addFormVisible } = useModel('commonTable');
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
    setAddFormVisible(false);
    // message.error('提交失败!');
    Modal.error({
      content: '提交失败' + errorInfo?.errorFields[0].errors,
    });
  };
  const handleCancel = () => {
    setAddFormVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={() => {
        setAddFormVisible(true);
      }}>{buttonString}</Button>
      <Modal title="增加" footer={null} visible={addFormVisible} onCancel={handleCancel} destroyOnClose>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={(data: any) => {
            onFinish(data);
            setAddFormVisible(false)
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
                initialValue={value.initialValue}
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

export default AddForm;
