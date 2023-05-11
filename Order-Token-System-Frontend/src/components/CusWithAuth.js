import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CusLogin from './CusLogin';

const CusWithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('customerToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <CusLogin/>;
    }
  };

  return AuthComponent;
};

export default CusWithAuth;