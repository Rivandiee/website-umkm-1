import { Router } from "express";
import * as CategoryController from "../../controllers/admin/category.controller";
import { verifyRole, verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);

const allowedRoles = ["SUPER_ADMIN", "CASHIER"];

/**
 * @swagger
 * tags:
 *   - name: Admin Category
 *     description: Manajemen kategori menu oleh Admin
 */

/**
 * @swagger
 * /admin/categories:
 *   get:
 *     summary: Mendapatkan semua kategori
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mendapatkan list kategori
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       _count:
 *                         type: object
 *                         properties:
 *                           menus:
 *                             type: integer
 */
router.get("/categories", verifyRole(allowedRoles), CategoryController.getCategories);

/**
 * @swagger
 * /admin/categories:
 *   post:
 *     summary: Membuat kategori baru
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Makanan Utama"
 *               description:
 *                 type: string
 *                 example: "Berbagai jenis hidangan utama"
 *     responses:
 *       200:
 *         description: Kategori berhasil dibuat
 *       500:
 *         description: Gagal membuat kategori
 */
router.post("/categories", verifyRole(allowedRoles), CategoryController.createCategory);

/**
 * @swagger
 * /admin/categories/{id}:
 *   put:
 *     summary: Mengupdate kategori
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID kategori yang akan diupdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Makanan Penutup"
 *               description:
 *                 type: string
 *                 example: "Hidangan manis"
 *     responses:
 *       200:
 *         description: Kategori berhasil diupdate
 *       500:
 *         description: Gagal mengupdate kategori
 */
router.put("/categories/:id", verifyRole(allowedRoles), CategoryController.updateCategory);

/**
 * @swagger
 * /admin/categories/{id}:
 *   delete:
 *     summary: Menghapus kategori
 *     tags: [Admin Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID kategori yang akan dihapus
 *     responses:
 *       200:
 *         description: Kategori berhasil dihapus
 *       500:
 *         description: Gagal menghapus kategori
 */
router.delete("/categories/:id", verifyRole(allowedRoles), CategoryController.deleteCategory);

export default router;
