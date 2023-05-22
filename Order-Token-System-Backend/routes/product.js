import { Router } from "express";
import productController from "../controllers/productController.js";
import outletController from "../controllers/outletController.js";

const router = Router();

router.post('/add',outletController.outletTokenAuthenticate, productController.addProduct);

router.post('/delete',outletController.outletTokenAuthenticate, productController.deleteProduct);

router.post('/update', outletController.outletTokenAuthenticate, productController.updateProduct);

export default router;