import { Code } from '@/types';
import { Modal } from 'antd';

const feedBack = (res: any, sucMsg: string, failMsg: string) => {
  if (res?.status === Code.SuccessCode) {
    Modal.success({
      content: sucMsg,
    });
  } else {
    Modal.error({
      content: res?.msg + res?.data || failMsg,
    });
  }
};

export default feedBack;
