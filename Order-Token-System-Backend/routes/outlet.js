import { Router } from "express";
import outletController from '../controllers/outletController.js'

const router = Router();

router.post('/sendotp',outletController.outletRegisterEmailOtp, outletController.sendEmailOTP);

router.post('/register', outletController.verifyEmailOtp, outletController.outletRegister);

router.post('/login', outletController.outletLogin);

export default router;