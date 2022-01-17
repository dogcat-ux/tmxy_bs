import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React from 'react';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/footer';
import { login } from '@/services/user';

import styles from './index.less';
import { Code } from '@/types';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const res = await login({ ...values });
      if (res.status === Code.SuccessCode) {
        localStorage.setItem('admin_account', res.data?.user?.user_name||'');
        localStorage.setItem('admin_token', res.data?.token || '');
        localStorage.setItem('admin_avatar', res.data?.user?.avatar || '');
        message.success('登录成功!');
        await fetchUserInfo();
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }else{
        message.error(res.msg||'登录失败');
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang="">
        {/*{SelectLang && <SelectLang />}*/}
      </div>
      <div className={styles.content}>
        <LoginForm
          title="土木工程学院后台"
          subTitle="backstage"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <>
            <ProFormText
              name="user_name"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon}/>,
              }}
              placeholder={'用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
                {
                  pattern: /^\w{5,15}$/,
                  message: '用户名在5-15位内！',
                }
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon}/>,
              }}
              placeholder='密码'
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
                {
                  pattern: /^\w{6,16}$/,
                  message: '密码在6-16位内！',
                }
              ]}
            />
          </>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
