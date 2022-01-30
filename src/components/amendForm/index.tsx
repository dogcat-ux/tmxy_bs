import React, { useEffect } from 'react';
import { Button, DatePicker, message, Modal, Select } from 'antd';
import { Form, Input } from 'antd';
import { useModel } from '@@/plugin-model/useModel';
import moment from 'moment';
// import type { Edit } from '@/pages/account/interface';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface FormProps {
  visible: boolean;
  handleCancel: () => void;
  // handleSubmit: (value: Edit) => void;
  handleSubmit: (value: any) => void;
  // account?: API.UserList;
  items: API.ActivityRes;
}

const AmendForm: React.FC<FormProps> = ({
                                         visible,
                                         handleCancel,
                                         handleSubmit,
                                         items,
                                       }) => {
  const {
    // activity_id,
    activity_name,
    category_name,
    // activity_unit,
    // publisher_,
    // publisher_name,
    // content,
    // image,
    sign_up_start_time,
    sign_up_end_time,
    // activity_place,
    activity_start_time,
    activity_end_time,
    recruitment,
    // basic_score,
    // code,
    // sign_in_place,
    // sign_in_range,
    // responsible_people,
    // responsible_people_phone,
    // status,
  } = items;
  const { categorys, getCategorys } = useModel('common');
  const onFinish = (values: any) => {
    // const v=_.deepClone(values)
    console.log("values",values);
    console.log({ ...values });
    handleSubmit({ ...values,
      sign_up_start_time: values.signTime[0],
      sign_up_end_time:  values.signTime[1],
      // activity_start_time: number,
      // activity_end_time: number,
    });
  };
  // const userLevel = localStorage.getItem('userLevel');
  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
    message.error('Submit fail!');
  };
  useEffect(() => {
    getCategorys();
    // Promise.all([ getCategorys()]);
  }, []);
  return (
    <Modal title="修改" footer={null} visible={visible} onCancel={handleCancel}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="activity_name"
          label="活动名称"
          rules={[{ required: true }]}
          initialValue={activity_name}
        >
          {/*<Input placeholder={activity_name}/>*/}
          <Input/>
        </Form.Item>

        <Form.Item
          name="category_name"
          label="活动类型"
          rules={[{ required: true }]}
          initialValue={category_name}
        >
          <Select defaultValue={category_name} style={{ width: 120 }}>
            {
              categorys?.map((value: API.categoryItem) =>
                <Option value={value.category_name} key={value.id}>{value.category_name}</Option>,
              )
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="招募人数"
          name="recruitment"
          rules={[{ required: true }]}
          initialValue={recruitment}
        >
          {/*<Input placeholder={recruitment}/>*/}
          <Input/>
        </Form.Item>

        <Form.Item
          label="报名时间"
          name="signTime"
          initialValue={[moment(sign_up_start_time),moment(sign_up_end_time)]}
          rules={[{ required: true }]}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            allowClear
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item
          label="活动时间"
          name="activeTime"
          initialValue={[moment(activity_start_time),moment(activity_end_time)]}
          rules={[{ required: true }]}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            allowClear
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AmendForm;
