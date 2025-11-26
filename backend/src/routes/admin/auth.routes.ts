import { Router } from "express";
import * as AuthController from "../../controllers/admin/auth.controller";
import { validate } from "../../middlewares/validateMiddleware";
import { loginSchema } from "../../schemas/auth.schema";


const router = Router();

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
router.post("/login",validate(loginSchema), AuthController.login);

export default router;
