import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import validateToken from '../authapis/validateToken';

const CustomerAuthContext = createContext();

const CustomerAuthProvider = ({ children }) => {
  const [customerAccessToken, setCustomerAccessToken] = useState(null);

  const loginCustomer = (accessToken) => {
    setCustomerAccessToken(accessToken);
  };

  const isCustomerAccessTokenInvalid = () =>{
    return customerAccessToken === null || !validateToken(customerAccessToken);
  };

  const logoutCustomer = () => {
    setCustomerAccessToken(null);
    Cookies.remove('customerRefreshToken');
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customerAccessToken,
        loginCustomer,
        logoutCustomer,
        isCustomerAccessTokenInvalid
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};

export {CustomerAuthContext, CustomerAuthProvider};