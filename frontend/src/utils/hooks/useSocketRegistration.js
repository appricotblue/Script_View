import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useSocketRegistration = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const s = io(`${VITE_BASE_URL}/`);
    setSocket(s);
    return () => s.disconnect();
  }, []);
  return [socket, setSocket];
};

export default useSocketRegistration;
