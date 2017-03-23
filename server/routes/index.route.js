import express from 'express';
import questionRoutes from './question.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-status - Check service status */
router.get('/health-status', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/questions', questionRoutes);

export default router;
