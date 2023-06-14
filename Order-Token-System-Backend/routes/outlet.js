import { Router } from "express";
import outletController from '../controllers/outlet/outletController.js'
import outletProductRoutes from "./outletProduct.js";
import outletOrderRoutes from "./outletOrder.js";
import outletOrderItemRoutes from "./outletOrderItem.js";
const outletRoutes = Router();

outletRoutes.use('/products', outletProductRoutes)

outletRoutes.use('/orderitems',outletOrderItemRoutes);

outletRoutes.use('/orders',outletOrderRoutes);

outletRoutes.post('/sendotp',outletController.outletRegisterEmailOtp, outletController.sendEmailOTP);

outletRoutes.post('/register', outletController.verifyEmailOtp, outletController.outletRegister);

outletRoutes.post('/login', outletController.outletLogin);

outletRoutes.post('/refreshtoken', outletController.outletTokenRefresh);

export default outletRoutes;