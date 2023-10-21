import { Navigate } from 'react-router-dom';

const Home = () => {
  return <Navigate to="/document/123" />;
  // return <div style={{ height: '100vh', width: '100vw' }}>Home Page</div>;
};

export default Home;
