import { Router } from "express";
import outletController from "../controllers/outlet/outletController.js";

import orderController from "../controllers/order/orderController.js";

const outletOrderRoutes = Router();

outletOrderRoutes.use(outletController.outletTokenAuthenticate);
outletOrderRoutes.post('/add', orderController.addOrder);
outletOrderRoutes.delete('/delete/:orderId',orderController.deleteOrder);
outletOrderRoutes.get('/get',orderController.getOutletOrder);

export default outletOrderRoutes;