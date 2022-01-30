import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/rightContent';
import Footer from '@/components/footer';
import { RequestConfig } from 'umi';

const loginPath = '/user/login';

export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => API.CurrentUser | undefined;
}> {
  const fetchUserInfo = () => {
    const user_name = localStorage.getItem('admin_account');
    if (user_name == null) return undefined;
    return { user_name };
  };
  if (history.location.pathname !== loginPath) {
    const currentUser = fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: [],
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};


export const request: RequestConfig = {
  errorConfig: {
    adaptor: (resData) => {
      // resData 是我们自己的数据
      return {
        ...resData,
        total: resData?.data?.total,
        success: resData?.msg,
        errorMessage: resData?.error,
      };
    },
  },
};
