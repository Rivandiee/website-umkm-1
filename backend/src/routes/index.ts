import { Router } from "express";
import adminAuthRoutes from "./admin/auth.routes";
import adminMenuRoutes from "./admin/menu.routes";
import adminOrderRoutes from "./admin/order.routes";
import adminTableRoutes from "./admin/table.routes";
import adminCategoryRoutes from "./admin/category.routes";
// Import route baru
import adminAnalyticsRoutes from "./admin/analytics.routes"; 

import customerMenuRoutes from "./customer/menu.routes";
import customerOrderRoutes from "./customer/order.routes";

const router = Router();

// Admin Routes
router.use("/admin", adminAuthRoutes);
router.use("/admin", adminMenuRoutes);
router.use("/admin", adminOrderRoutes);
router.use("/admin", adminTableRoutes);
router.use("/admin", adminCategoryRoutes);
// Register route analytics
router.use("/admin/analytics", adminAnalyticsRoutes); 

// Customer Routes
router.use("/customer", customerMenuRoutes);
router.use("/customer", customerOrderRoutes);

export default router;