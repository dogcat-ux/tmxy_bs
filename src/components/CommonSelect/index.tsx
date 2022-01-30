import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useModel } from '@@/plugin-model/useModel';

const { Option } = Select;

const CommonSelect: React.FC<{
  sendApi: (data?: any) => void,
  items: string[] | number[],
  defaultValue: string
}> = ({ sendApi, items, defaultValue }) => {
  const { setSelect } = useModel('CommonSelect');
  const checkChange = async (val: string) => {
    if (val !== defaultValue) {
      setSelect(val);
      sendApi(val);
    } else {
      setSelect('');
      sendApi('');
    }
  };
  useEffect(() => {
  }, []);
  return (
    <div>
      <Select defaultValue={defaultValue} style={{ width: 120 }}
              onChange={checkChange}>
        {
          items?.map((value, index) => {
            return <Option value={value} key={index}>{value}</Option>;
          })
        }
      </Select>
    </div>
  );
};

export default CommonSelect;
