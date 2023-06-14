import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerAuthContext } from "../contextproviders/CustomerAuthContext";

const customerTokenRefresh = async () => {
  const navigate = useNavigate();
  const cookieValue = Cookies.get("customerRefreshToken");
  const {loginCustomer} = useContext(CustomerAuthContext);
  if (cookieValue === null) {
    navigate("/customer/login");
    return;
  }
  try {
    const response = await axios.post("/customers/refreshtoken", {
      headers: {
        Cookie: `customerRefreshToken=${cookieValue}`,
      },
    });
    loginCustomer(response.data.customerAccessToken);
  } catch (error) {
    navigate('/customer/login');
    console.log(error);
  }
};

export default customerTokenRefresh;
