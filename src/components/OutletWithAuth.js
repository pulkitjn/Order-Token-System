import { useState, useEffect } from 'react';
import OutletLogin from './OutletLogin';

const OutletWithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('outletToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, []);
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return <OutletLogin/>;
    }
  };

  return AuthComponent;
};

export default OutletWithAuth;