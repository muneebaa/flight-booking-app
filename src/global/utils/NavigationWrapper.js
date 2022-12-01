// to start every page from the beginning
import { useSelector } from 'react-redux';
import { useLayoutEffect, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationWrapper = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  const userObj = Object.keys(user).length;

  useEffect(() => {
    if (!userObj) {
      navigate('/');
    }
  }, []);

  return children;
};

export default NavigationWrapper;
