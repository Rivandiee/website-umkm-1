import { Router } from "express";
import adminRoutes from "./admin.routes";
import customerRoutes from "./customer.routes";

const router = Router();

// Grouping routes
router.use("/admin", adminRoutes);
router.use("/customer", customerRoutes);

export default router;