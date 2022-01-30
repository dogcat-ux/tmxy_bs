import { useState } from 'react';

export default () => {
  const [search, setSearch] = useState('');
  return {
    search, setSearch,
  };
};
