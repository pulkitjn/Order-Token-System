import { Router } from "express";
import customerController from '../controllers/customerController.js'

const router = Router();

/* {email: "EMAIL_TO_WHICH_OTP_IS_SENT"} */
router.post('/sendotp',customerController.customerRegisterEmailOtp, customerController.sendEmailOTP);


/* 
{
    email: "CUSTOMER_EMAIL",
    otp: "OTP",
    firstName: "CUSTOMER_FIRST_NAME",
    lastName: "CUSTOMER_LAST_NAME",
    pswd: "MINIMUM_8_CHAR",
    cnfrmPswd: "NEED_TO_BE_SAME_AS_PSWD"
}
*/
router.post('/register', customerController.verifyEmailOtp, customerController.customerRegister);

/*
{
    email: "CUSTOMER_EMAIL",
    pswd: "CUSTOMER_PSWD"
}
*/
router.post('/login', customerController.customerLogin);

router.get('/protected', customerController.customerTokenAuthenticate, (req,res)=>{
    res.send(`You are now in a protected route. Your email is ${req.email}`);
})
export default router;