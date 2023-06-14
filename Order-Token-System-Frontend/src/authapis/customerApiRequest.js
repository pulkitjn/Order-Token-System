import axios from "axios";
import { useContext } from "react";
import { CustomerAuthContext } from "../contextproviders/CustomerAuthContext";
import validateToken from "./validateToken";

const customerApiRequest = async (endpoint, method = "GET", body = null) => {

  const {customerAccessToken} = useContext(CustomerAuthContext);

  // Check token validity and handle API request
  if (validateToken(customerAccessToken)) {
    try {
      const response = await axios({
        method: method,
        url: `/customers${endpoint}`,
        data: body,
        headers: {
          authorization: `Bearer ${customerAccessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("API request failed.");
    }
  } else {
    await refreshToken();
    return apiRequest(endpoint, method, body); // Retry the API request with the new access token
  }
};

export default customerApiRequest;
