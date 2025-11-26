import { Router } from "express";
import * as SessionController from "../../controllers/customer/session.controller";

const router = Router();

/**
 * @swagger
 * /customer/session:
 *   post:
 *     summary: Memulai sesi meja baru (Scan QR)
 *     tags: [Customer Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tableNumber
 *             properties:
 *               tableNumber:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sesi berhasil dibuat
 */
router.post("/session", SessionController.startSession);

export default router;
