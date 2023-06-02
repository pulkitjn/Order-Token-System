import { Router } from "express";
import customerController from '../controllers/customer/customerController.js'
import customerProductRoutes from "./customerProduct.js";
import customerOrderRoutes from "./customerOrder.js";

const customerRoutes = Router();

customerRoutes.use('/products', customerProductRoutes);
customerRoutes.use('/orders', customerOrderRoutes);
/* {email: "EMAIL_TO_WHICH_OTP_IS_SENT"} */
customerRoutes.post('/sendotp',customerController.customerRegisterEmailOtp, customerController.sendEmailOTP);


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
customerRoutes.post('/register', customerController.verifyEmailOtp, customerController.customerRegister);

/*
{
    email: "CUSTOMER_EMAIL",
    pswd: "CUSTOMER_PSWD"
}
*/
customerRoutes.post('/login', customerController.customerLogin);

customerRoutes.get('/protected', customerController.customerTokenAuthenticate, (req,res)=>{
    res.send(`You are now in a protected route. Your email is ${req.customerId}`);
})
export default customerRoutes;