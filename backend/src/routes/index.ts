import { Router } from "express";
import adminAuthRoutes from "./admin/auth.routes";
import adminMenuRoutes from "./admin/menu.routes";
import adminOrderRoutes from "./admin/order.routes";
import adminTableRoutes from "./admin/table.routes";
import adminCategoryRoutes from "./admin/category.routes";

const router = Router();

// Admin Routes
router.use("/admin", adminAuthRoutes);
router.use("/admin", adminMenuRoutes);
router.use("/admin", adminOrderRoutes);
router.use("/admin", adminTableRoutes);
router.use("/admin", adminCategoryRoutes);

// Customer Routes


export default router;