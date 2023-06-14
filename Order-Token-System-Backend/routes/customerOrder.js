import { Router } from "express";
import customerController from "../controllers/customer/customerController.js";
import orderController from "../controllers/order/orderController.js";

const customerOrderRoutes = Router();

customerOrderRoutes.use(customerController.customerTokenAuthenticate);

customerOrderRoutes.get('/',orderController.getCustomerOrder);

export default customerOrderRoutes;