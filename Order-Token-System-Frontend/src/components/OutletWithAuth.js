import { useContext, useCallback } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { OutletAuthContext } from "../contextproviders/OutletAuthContext";
import { ToastContext } from "../contextproviders/ToastContext";

const OutletWithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {

    const {isOutletAccessTokenInvalid, loginOutlet} = useContext(OutletAuthContext);
    const {showToast} = useContext(ToastContext)

    const isAuthorised = useCallback(() => {
      if (isOutletAccessTokenInvalid()) {
        const cookieValue = Cookies.get("outletRefreshToken");
        if(cookieValue === null){
          console.log('Logged out because no refresh token');
          return false;
        }else{
          const getAndSetAccessToken = async (cookieValue) => {
            try {
              const response = await axios.post("/outlets/refreshtoken", {
                headers: {
                  Cookie: `outletRefreshToken=${cookieValue}`,
                },
              });
              loginOutlet(response.data.outletRefreshToken);
              console.log("Logged in through refresh token");
              return true;
            } catch (error) {
              showToast(error.response.data.error, 'error');
              console.log(error);
              console.log("Logged out because there is some error in refresh token");
              return false;
            }
          };
          return getAndSetAccessToken(cookieValue);
        }
      }else{
        console.log("When it is logged in through the login page");
        return true;
      }
    }, [isOutletAccessTokenInvalid, loginOutlet, showToast]);

    return (
      <>
        {isAuthorised() ? (
          <WrappedComponent {...props} />
        ) : (
          <Navigate to="/outlet/login" />
        )}
      </>
    )
  };

  return AuthComponent;
};

export default OutletWithAuth;