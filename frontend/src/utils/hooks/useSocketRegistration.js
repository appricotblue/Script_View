import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocketRegistration = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const s = io('http://localhost:8080');
    setSocket(s);
    return () => s.disconnect();
  }, []);
  return [socket, setSocket];
};

export default useSocketRegistration;
