import { message } from 'antd';
import { extend } from 'umi-request';

const request = extend({
  prefix: process.env.NODE_ENV === 'development' ? '/apl/' : 'http://1.12.252.83:4000/',
});

request.interceptors.response.use((res) => {
  const codeMaps: Record<string, { msg: string; url?: string }> = {
    '401': {
      msg: 'Token Expired',
      url: '/user/login',
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
      const { msg } = codeMaps[res.status];
      message.error(msg);
      // if(url){
      //   window.location.href=window.location.href.split("/")[0]+url;
      // }
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
