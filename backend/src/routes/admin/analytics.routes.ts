import { Router } from "express";
import * as AnalyticsController from "../../controllers/admin/analytics.controller";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

// Lindungi route ini dengan token admin
router.use(verifyToken);

/**
 * @swagger
 * /admin/analytics/dashboard:
 *   get:
 *     summary: Mendapatkan data statistik dashboard lengkap
 *     tags: [Admin Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data dashboard berhasil diambil
 */
router.get("/dashboard", AnalyticsController.getDashboardData);

export default router;
