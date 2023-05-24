import { Router } from "express";
import outletController from "../controllers/outletController.js";

import orderController from "../controllers/orderController.js";

const router = Router();

router.post('/add',outletController.outletTokenAuthenticate, orderController.addOrder);

export default router;