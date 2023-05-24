import { Router } from "express";
import productController from "../controllers/productController.js";
import outletController from "../controllers/outletController.js";

const router = Router();

router.post('/add',outletController.outletTokenAuthenticate, productController.addProduct);

router.delete('/delete',outletController.outletTokenAuthenticate, productController.deleteProduct);

router.put('/update', outletController.outletTokenAuthenticate, productController.updateProduct);

router.get('/names', outletController.outletTokenAuthenticate, productController.getProductNames);

export default router;