import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import validateToken from '../authapis/validateToken';

const OutletAuthContext = createContext();

const OutletAuthProvider = ({ children }) => {
  const [outletAccessToken, setOutletAccessToken] = useState(null);

  const loginOutlet = (accessToken) => {
    setOutletAccessToken(accessToken);
  };

  const isOutletAccessTokenInvalid = () =>{
    return outletAccessToken === null || !validateToken(outletAccessToken);
  };

  const logoutOutlet = () => {
    setOutletAccessToken(null);
    Cookies.remove('outletRefreshToken');
  };

  return (
    <OutletAuthContext.Provider
      value={{
        isOutletAccessTokenInvalid,
        outletAccessToken,
        loginOutlet,
        logoutOutlet,
      }}
    >
      {children}
    </OutletAuthContext.Provider>
  );
};

export {OutletAuthContext, OutletAuthProvider}