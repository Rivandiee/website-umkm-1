// backend/src/routes/admin/table.routes.ts

import { Router } from "express";
import * as TableController from "../../controllers/admin/table.controller";
import { verifyRole, verifyToken } from "../../middlewares/authMiddleware";
import { validate } from "../../middlewares/validateMiddleware";
import { createTableSchema, updateTableSchema } from "../../schemas/table.schema";

const router = Router();

router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   - name: Admin Tables
 *     description: Manajemen Meja Restoran
 */

/**
 * @swagger
 * /admin/tables:
 *   get:
 *     summary: Mendapatkan semua meja
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List semua meja
 */
router.get(
  "/tables",
  verifyRole(["SUPER_ADMIN", "CASHIER"]),
  TableController.getTables
);

/**
 * @swagger
 * /admin/tables:
 *   post:
 *     summary: Membuat meja baru
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - location
 *               - capacity
 *             properties:
 *               number:
 *                 type: integer
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Meja berhasil dibuat
 */
router.post(
  "/tables", 
  verifyRole(["SUPER_ADMIN", "CASHIER"]), 
  validate(createTableSchema), // <--- Validasi di sini
  TableController.createTable
);

/**
 * @swagger
 * /admin/tables/{id}:
 *   put:
 *     summary: Mengupdate data meja
 *     tags: [Admin Tables]
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
 *               number:
 *                 type: integer
 *               location:
 *                 type: string
 *               capacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Meja berhasil diupdate
 *       400:
 *         description: Gagal update (misal nomor meja duplikat)
 */
router.put(
  "/tables/:id", 
  verifyRole(["SUPER_ADMIN", "CASHIER"]), 
  validate(updateTableSchema), // <--- Validasi di sini
  TableController.updateTable
);

/**
 * @swagger
 * /admin/tables/{id}:
 *   delete:
 *     summary: Menghapus meja
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Meja berhasil dihapus
 */
router.delete(
  "/tables/:id",
  verifyRole(["SUPER_ADMIN", "CASHIER"]),
  TableController.deleteTable
);

export default router;
