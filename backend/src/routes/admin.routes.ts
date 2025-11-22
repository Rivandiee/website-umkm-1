import { Router } from "express";
import * as AuthController from "../controllers/admin/auth.controller";
import * as RegisterController from "../controllers/admin/register.controller"; // <--- Import Controller Baru
import * as MenuController from "../controllers/admin/menu.controller";
import * as OrderController from "../controllers/admin/order.controller";
import * as TableController from "../controllers/admin/table.controller";
import { verifyToken } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// --- Public Routes (Tidak butuh token) ---
router.post("/login", AuthController.login);
router.post("/register", RegisterController.register); // <--- Route Register menggunakan controller terpisah

// --- Protected Routes (Butuh Token) ---
router.use(verifyToken);

// Menus
router.get("/menus", MenuController.getMenus);
router.post("/menus", upload.single("image"), MenuController.createMenu);
router.patch("/menus/:id/status", MenuController.updateMenuStatus);

// Orders
router.get("/orders", OrderController.getOrders);
router.patch("/orders/:id/status", OrderController.updateOrderStatus);

// Tables
router.get("/tables", TableController.getTables);
router.post("/tables", TableController.createTable);

export default router;