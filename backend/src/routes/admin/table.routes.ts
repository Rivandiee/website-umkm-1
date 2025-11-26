import { Router } from "express";
import * as TableController from "../../controllers/admin/table.controller";
import { verifyRole, verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken); // Semua route meja harus login admin

/**
 * @swagger
 * /admin/tables:
 *   get:
 *     summary: Mendapatkan semua meja
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List semua meja
 */
router.get("/tables", verifyRole(["SUPER_ADMIN", "CASHIER"]), TableController.getTables);

/**
 * @swagger
 * /admin/tables:
 *   post:
 *     summary: Membuat meja baru
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - location
 *               - capacity
 *             properties:
 *               number:
 *                 type: integer
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Meja berhasil dibuat
 */
router.post("/tables", verifyRole(["SUPER_ADMIN", "CASHIER"]), TableController.createTable);

export default router;
