import { Router } from "express";
import outletController from "../controllers/outlet/outletController.js";

import orderController from "../controllers/order/orderController.js";

const outletOrderRoutes = Router();

outletOrderRoutes.use(outletController.outletTokenAuthenticate);
outletOrderRoutes.post('/add', orderController.addOrder);

export default outletOrderRoutes;