import { Router } from "express";
import productController from "../controllers/product/productController.js";
import outletController from "../controllers/outlet/outletController.js";

const outletProductRoutes = Router();

outletProductRoutes.use(outletController.outletTokenAuthenticate);

outletProductRoutes.post('/add', productController.addProduct);

outletProductRoutes.delete('/delete/:name',productController.deleteProduct);

outletProductRoutes.patch('/update/:name', productController.updateProduct);

outletProductRoutes.get('/names', productController.getProductNames);

outletProductRoutes.get('/', productController.getProducts);
export default outletProductRoutes;