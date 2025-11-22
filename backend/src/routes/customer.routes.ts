import { Router } from "express";
import * as MenuController from "../controllers/customer/menu.controller";
import * as OrderController from "../controllers/customer/order.controller";

const router = Router();

// Public Routes untuk Customer
router.get("/menus", MenuController.getPublicMenus);
router.post("/order", OrderController.createOrder);
router.get("/order/:orderId", OrderController.getOrderStatus);

export default router;