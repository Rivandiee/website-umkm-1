import { Router } from "express";
import * as RegisterController from "../../controllers/admin/register.controller";
import { verifyRole, verifyToken } from "../../middlewares/authMiddleware";

const router = Router();

// Lindungi route ini
router.use(verifyToken, verifyRole(["SUPER_ADMIN"]));

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Mendaftarkan admin baru
 *     tags: [Admin register]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - name
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin berhasil didaftarkan
 *       400:
 *         description: Input tidak valid
 */

router.post("/register", RegisterController.register);

/**
 * @swagger
 * /admin/register:
 *   get:
 *     summary: Melihat semua admin yang sudah terdaftar
 *     tags: [Admin register]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua data admin
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get("/register", RegisterController.getAllAdmins);

export default router;

