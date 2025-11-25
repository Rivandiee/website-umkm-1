import { Router } from "express";
import * as MenuController from "../../controllers/customer/menu.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Customer Menu
 *     description: Endpoints menu untuk customer (public access)
 */

/**
 * @swagger
 * /customer/menus:
 *   get:
 *     summary: Mendapatkan daftar menu untuk customer
 *     tags: [Customer Menu]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter menu berdasarkan nama kategori (opsional, contoh "Makanan")
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan list menu
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   price:
 *                     type: integer
 *                   image:
 *                     type: string
 *                   description:
 *                     type: string
 *                   isAvailable:
 *                     type: boolean
 *                   category:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/menus", MenuController.getPublicMenus);

export default router;
