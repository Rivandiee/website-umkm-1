import { Router } from "express";
import * as MenuController from "../../controllers/admin/menu.controller";
import { upload } from "../../middlewares/uploadMiddleware";
import { verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken); // Middleware semua menu

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
 *         description: List semua menu
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
 */
router.post("/menus", upload.single("image"), MenuController.createMenu);

/**
 * @swagger
 * /admin/menus/{id}/status:
 *   patch:
 *     summary: Mengubah status menu (aktif/nonaktif)
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
 *             properties:
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Status menu berhasil diperbarui
 *       404:
 *         description: Menu tidak ditemukan
 */
router.patch("/menus/:id/status", MenuController.updateMenuStatus);

export default router;
