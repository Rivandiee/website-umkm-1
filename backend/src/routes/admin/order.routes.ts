import { Router } from "express";
import * as OrderController from "../../controllers/admin/order.controller";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

// Semua route admin order butuh token
router.use(verifyToken);

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Mendapatkan semua order
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, PREPARING, DONE, ALL]
 *         description: Filter berdasarkan status order
 *     responses:
 *       200:
 *         description: List semua order
 */
router.get("/orders", OrderController.getOrders);

/**
 * @swagger
 * /admin/orders/{id}/status:
 *   patch:
 *     summary: Mengupdate status order
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PREPARING, DONE, CANCELED]
 *     responses:
 *       200:
 *         description: Status order berhasil diperbarui
 *       404:
 *         description: Order tidak ditemukan
 */
router.patch("/orders/:id/status", OrderController.updateOrderStatus);

export default router;
