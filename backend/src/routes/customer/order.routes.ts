import { Router } from "express";
import * as OrderController from "../../controllers/customer/order.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Customer Order
 *     description: Manajemen pesanan oleh customer
 */

/**
 * @swagger
 * /customer/orders:
 *   post:
 *     summary: Membuat pesanan baru
 *     tags: [Customer Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - tableNumber
 *               - items
 *               - totalPrice
 *               - paymentMethod
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: "Budi Santoso"
 *               tableNumber:
 *                 type: integer
 *                 example: 5
 *               totalPrice:
 *                 type: integer
 *                 example: 75000
 *               paymentMethod:
 *                 type: string
 *                 enum: [cash, qris]
 *                 example: "cash"
 *               items:
 *                 type: array
 *                 description: Daftar item yang dipesan
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - qty
 *                     - price
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     qty:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: integer
 *                       example: 25000
 *                     note:
 *                       type: string
 *                       example: "Pedas manis"
 *     responses:
 *       201:
 *         description: Pesanan berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     status:
 *                       type: string
 *       500:
 *         description: Gagal membuat pesanan
 */

/**
 * @swagger
 * /customer/orders/{orderId}/status:
 *   get:
 *     summary: Melihat status pesanan
 *     tags: [Customer Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID Pesanan
 *     responses:
 *       200:
 *         description: Detail status pesanan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       enum: [PENDING, PREPARING, DONE]
 *                     tableNumber:
 *                       type: integer
 *       404:
 *         description: Pesanan tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/orders/:orderId/status", OrderController.getOrderStatus);

export default router;
