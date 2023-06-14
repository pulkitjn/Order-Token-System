import { Router } from "express";
import productController from "../controllers/product/productController.js";
import outletController from "../controllers/outlet/outletController.js";

const outletProductRoutes = Router();

outletProductRoutes.use(outletController.outletTokenAuthenticate);

outletProductRoutes.post('/', productController.addProduct);

outletProductRoutes.delete('/:name',productController.deleteProduct);

outletProductRoutes.patch('/:name', productController.updateProduct);

outletProductRoutes.get('/names', productController.getProductNames);

outletProductRoutes.get('/', productController.getProducts);
export default outletProductRoutes;