import React from 'react';
import { Input } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const { Search } = Input;

const CommonSearch: React.FC<{
  sendApi: (data?: any) => void
}> = ({ sendApi }) => {
  const { setSearch } = useModel('commonSearch');
  const onSearch = (value: string) => {
    setSearch(value);
    if (value) {
      sendApi({ info: value });
    } else {
      sendApi();
    }
  };
  return (
    <Search placeholder="输入搜索内容" onSearch={onSearch} style={{ width: 200 }} allowClear/>
  );
};

export default CommonSearch;
