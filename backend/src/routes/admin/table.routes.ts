/**
 * @swagger
 * tags:
 *   name: Admin Tables
 *   description: Manajemen meja oleh Admin
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
 *
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
 *             properties:
 *               number:
 *                 type: integer
 *               status:
 *                 type: string
 *                 default: available
 *     responses:
 *       201:
 *         description: Meja berhasil dibuat
 */

/**
 * @swagger
 * /admin/tables/{id}/status:
 *   patch:
 *     summary: Update status meja
 *     tags: [Admin Tables]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
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
 *                 type: string
 *                 enum: [available, reserved, occupied]
 *     responses:
 *       200:
 *         description: Status meja diperbarui
 */
