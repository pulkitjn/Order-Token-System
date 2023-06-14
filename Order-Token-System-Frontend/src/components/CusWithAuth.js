import { useContext, useCallback } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { CustomerAuthContext } from "../contextproviders/CustomerAuthContext";
import { ToastContext } from "../contextproviders/ToastContext";

const CusWithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const { isCustomerAccessTokenInvalid, loginCustomer } =
      useContext(CustomerAuthContext);
    const { showToast } = useContext(ToastContext);

    const isAuthorised = useCallback(() => {
      if (isCustomerAccessTokenInvalid()) {
        const cookieValue = Cookies.get("customerRefreshToken");
        if (cookieValue === null) {
          console.log("Logged out because no refresh token");
          return false;
        } else {
          const getAndSetAccessToken = async (cookieValue) => {
            try {
              const response = await axios.post("/customers/refreshtoken", {
                headers: {
                  Cookie: `customerRefreshToken=${cookieValue}`,
                },
              });
              loginCustomer(response.data.customerAccessToken);
              console.log("Logged in through refresh token");
              return true;
            } catch (error) {
              showToast(error.response.data.error, "error");
              console.log(error);
              console.log(
                "Logged out because there is some error in the refresh token"
              );
              return false;
            }
          };
          return getAndSetAccessToken(cookieValue);
        }
      } else {
        console.log("When it is logged in through the login page");
        return true;
      }
    }, [isCustomerAccessTokenInvalid, loginCustomer, showToast]);

    return (
      <>
        {isAuthorised() ? (
          <WrappedComponent {...props} />
        ) : (
          <Navigate to="/customer/login" />
        )}
      </>
    );
  };

  return AuthComponent;
};

export default CusWithAuth;
