import { Navigate, useLocation } from 'react-router-dom';

const Home = () => {
  const { state } = useLocation();
  let isLoggedIn = state?.isLoggedIn;
  if (!state?.isLoggedIn) isLoggedIn = false;
  return isLoggedIn ? <Navigate to="/document/123" /> : <Navigate to="/login" />;
};

export default Home;
