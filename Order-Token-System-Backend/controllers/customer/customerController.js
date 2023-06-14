import customerRegisterEmailOtp from "./customerRegisterEmailOtp.js";
import verifyEmailOtp from "../emailOtp/verifyEmailOtp.js";
import customerRegister from "./customerRegister.js";
import customerLogin from "./customerLogin.js";
import sendEmailOTP from "../emailOtp/sendEmailOtp.js";
import customerTokenAuthenticate from "./customerTokenAuthenticate.js";
import customerTokenRefresh from "./customerTokenRefresh.js";

export default {
    customerRegisterEmailOtp,
    customerTokenRefresh,
    customerTokenAuthenticate,
    verifyEmailOtp,
    customerRegister,
    customerLogin,
    sendEmailOTP
  };
