import { useState } from 'react';

export default () => {
  const [select, setSelect] = useState('');
  return {
    select, setSelect,
  };
};
