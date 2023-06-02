import { Router } from "express";
import productController from "../controllers/product/productController.js";
import customerController from "../controllers/customer/customerController.js";

const customerProductRoutes = Router();

customerProductRoutes.use(customerController.customerTokenAuthenticate);

customerProductRoutes.get('/:outletId', productController.getProducts);

export default customerProductRoutes;