import React, { useState } from 'react';
import { Pagination, Popconfirm, Space, Table } from 'antd';
import EditForm, { formDataItem } from '@/components/editForm';
import { useHistory } from 'umi';
import { useModel } from '@@/plugin-model/useModel';
import feedBack from '@/utils/apiFeedback';

interface CommonTableProps {
  //加载状态
  loading: boolean,
  //表格数据
  dataSource: any[],
  //表格配置
  columns: any,
  //回调函数，发送请求
  sendApi: (data: any) => void,
  //其他参数
  body?: any,
  onAmend?: (data: any) => void,
  //是否显示操作列 显示的话后面的参数必须传
  isAction?: boolean,
  //修改按钮点击
  url?: string,
  //表单数据
  formData?: formDataItem[],
  onFinish?: (data: any) => void,
  deleteApi?: (data: any) => void
}

const CommonTable: React.FC<CommonTableProps> = ({
                                                   loading,
                                                   dataSource,
                                                   columns,
                                                   sendApi,
                                                   body,
                                                   onAmend,
                                                   isAction = false,
                                                   url,
                                                   formData,
                                                   onFinish,
                                                   deleteApi,
                                                 }) => {
  const { pageSize, current, total, setCurrent, clear, setPageSize, setEditData, setEditFormVisible } = useModel('commonTable');
  const firstPage = useState(1)[0];
  const firstPageSize = useState(10)[0];
  const history = useHistory();
  const deleteClick = async (record: any) => {
    const res = deleteApi && await deleteApi(record);
    feedBack(res, '删除成功', '删除失败');
    sendApi({
      page_num: current || firstPage,
      page_size: pageSize || firstPageSize,
      ...body,
    });
  };
  const myColums = [
    ...columns,
    {
      title: '操作',
      // key: 'extra_add_id',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => {
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            url && history.push({
              pathname: url,
              query: { ...record },
            });
          }}
          >
            查看
          </a>
          <a onClick={() => {
            setEditFormVisible(true);
            clear();
            setEditData(record);
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onAmend && onAmend(record);
          }}>修改</a>
          <Popconfirm
            title="确定删除吗?"
            onConfirm={() => {
              deleteClick(record);
            }}
            okText="确实"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleChange = async (page?: number, ps?: number) => {
    setCurrent(page || firstPage);
    setPageSize(ps || firstPageSize);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    body ? await sendApi({
      page_num: page || firstPage,
      page_size: ps || firstPageSize,
      ...body,
    }) : await sendApi({
      page_num: page || firstPage,
      page_size: ps || firstPageSize,
    });
  };

  return (
    <div>
      <Table loading={loading} dataSource={dataSource || []} pagination={false} columns={isAction ? myColums : columns}
             rowKey={record => Number(record.activity_id)}/>
      <div className="my-common-pagination">
        <Pagination
          total={total}
          onChange={handleChange}
          current={current}
          pageSizeOptions={['10', '20', '30']}
          defaultPageSize={pageSize}
          showSizeChanger
          showQuickJumper
          showTotal={(t: number) => `Total ${t} items`}
        />
      </div>
      {
        onFinish && formData && <EditForm formData={formData} onFinish={onFinish}/>
      }
    </div>
  );
};

export default CommonTable;
