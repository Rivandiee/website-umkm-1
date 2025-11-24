/**
 * @swagger
 * tags:
 *   name: Admin Orders
 *   description: Manajemen pesanan oleh Admin
 */

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     summary: Mendapatkan semua order
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List semua order
 */

/**
 * @swagger
 * /admin/orders/{id}:
 *   get:
 *     summary: Mendapatkan detail order
 *     tags: [Admin Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail order ditemukan
 */

/**
 * @swagger
 * /admin/orders/{id}/status:
 *   patch:
 *     summary: Update status order
 *     tags: [Admin Orders]
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
 *                 type: string
 *                 enum: [pending, cooking, done]
 *     responses:
 *       200:
 *         description: Status diperbarui
 */
