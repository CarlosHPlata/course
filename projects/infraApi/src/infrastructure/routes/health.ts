import { Router } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     description: Health check endpoint
 *     responses:
 *       200:
 *         description: Returns OK
 */
router.get('/', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

export default router;
