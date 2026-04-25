import { Router } from "express";
import * as CategoryController from "../../controllers/customer/category.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Customer Category
 *     description: Endpoints kategori untuk customer (public access)
 */

/**
 * @swagger
 * /customer/categories:
 *   get:
 *     summary: Mendapatkan daftar kategori untuk customer
 *     tags: [Customer Category]
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan list kategori
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
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/categories", CategoryController.getCategories);

export default router;