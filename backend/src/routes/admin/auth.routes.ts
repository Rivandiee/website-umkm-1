import { Router } from "express";
import * as AuthController from "../../controllers/admin/auth.controller";
import * as RegisterController from "../../controllers/admin/register.controller";

const router = Router();

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Mendaftarkan admin baru
 *     tags: [Admin Auth]
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
 * /admin/login:
 *   post:
 *     summary: Login admin untuk mendapatkan token
 *     tags: [Admin Auth]
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
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *       401:
 *         description: Username atau password salah
 */
router.post("/login", AuthController.login);

export default router;
