import { Router } from "express";
import adminAuthRoutes from "./admin/auth.routes";
import adminMenuRoutes from "./admin/menu.routes";

const router = Router();

router.use("/admin", adminAuthRoutes);
router.use("/admin", adminMenuRoutes);

export default router;
