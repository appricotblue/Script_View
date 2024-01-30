import { useEffect, useState } from 'react';

import { VITE_BASE_URL } from '@/constants';
const useGetDocList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${VITE_BASE_URL}/api/scripts/list_recent`).then(async (response) => {
      const json = await response.json();
      setData(json.data);
    });
  }, []);
  return data;
};

export default useGetDocList;
