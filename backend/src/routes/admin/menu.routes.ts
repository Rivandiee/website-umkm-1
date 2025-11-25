import { Router } from "express";
import * as MenuController from "../../controllers/admin/menu.controller";
import { upload } from "../../middlewares/uploadMiddleware";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   - name: Admin Menu
 *     description: Manajemen menu makanan/minuman oleh Admin
 */

/**
 * @swagger
 * /admin/menus:
 *   get:
 *     summary: Mengambil semua menu (Admin)
 *     tags: [Admin Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List semua menu berhasil diambil
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/menus", MenuController.getMenus);

/**
 * @swagger
 * /admin/menus:
 *   post:
 *     summary: Membuat menu baru
 *     tags: [Admin Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Menu berhasil dibuat
 *       400:
 *         description: Input tidak valid
 *       500:
 *         description: Terjadi kesalahan server
 */
router.post("/menus", upload.single("image"), MenuController.createMenu);

/**
 * @swagger
 * /admin/menus/{id}:
 *   put:
 *     summary: Mengupdate menu (Edit detail & gambar)
 *     tags: [Admin Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID menu yang akan diedit
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Menu berhasil diupdate
 *       404:
 *         description: Menu tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.put("/menus/:id", upload.single("image"), MenuController.updateMenu);

/**
 * @swagger
 * /admin/menus/{id}:
 *   delete:
 *     summary: Menghapus menu
 *     tags: [Admin Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID menu yang akan dihapus
 *     responses:
 *       200:
 *         description: Menu berhasil dihapus
 *       404:
 *         description: Menu tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.delete("/menus/:id", MenuController.deleteMenu);

/**
 * @swagger
 * /admin/menus/{id}/status:
 *   patch:
 *     summary: Mengubah status menu (aktif / nonaktif)
 *     tags: [Admin Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isAvailable
 *             properties:
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status menu berhasil diperbarui
 *       404:
 *         description: Menu tidak ditemukan
 */
router.patch("/menus/:id/status", MenuController.updateMenuStatus);

export default router;
