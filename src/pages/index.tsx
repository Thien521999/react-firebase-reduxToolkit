import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const Home = () => {
  const history = useHistory();
  const { currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser) return history.replace('/login');
  }, [currentUser, history]);

  return <div>Home</div>;
};

export default Home;
