import { Router } from "express";
import orderController from "../controllers/order/orderController.js";
import outletController from "../controllers/outlet/outletController.js";

const outletOrderItemRoutes = Router();

outletOrderItemRoutes.use(outletController.outletTokenAuthenticate);
outletOrderItemRoutes.delete('/delete/:orderItemId', orderController.deleteOrderItem);
outletOrderItemRoutes.patch('/changestatus/:orderItemId',orderController.changeOrderItemStatus);

export default outletOrderItemRoutes;