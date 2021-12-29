import { message } from 'antd';
import { extend } from 'umi-request';
import { history } from 'umi';

const request = extend({
  prefix: process.env.NODE_ENV === 'development' ? '/apl/' : 'http://139.9.196.99:3000/',
});

request.interceptors.response.use((res) => {
  const codeMaps: Record<string, { msg: string; url?: string }> = {
    '401': {
      msg: 'Token Expired',
      url: '/middle',
    },
    '403': {
      msg: 'Failed to load resource',
    },
    '500': {
      msg: 'Server Error',
    },
    '504': {
      msg: 'Gateway Timeout',
    },
  };
  if (res.status !== 200) {
    try {
      const { msg, url } = codeMaps[res.status];
      message.error(msg);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      url && history.push(url);
    } catch (e) {
      message.error(res.statusText);
    }
  }
  return res;
});

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: localStorage.getItem('admin_token') || '',
      },
    },
  };
});

export default request;
