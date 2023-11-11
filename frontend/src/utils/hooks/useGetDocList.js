import { useState } from 'react';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const useGetDocList = () => {
  const [data, setData] = useState([]);
  fetch(`${VITE_BASE_URL}/api/scripts/list_recent`).then(async (response) => {
    const json = await response.json();
    setData(json.data);
  });
  return data;
};

export default useGetDocList;
