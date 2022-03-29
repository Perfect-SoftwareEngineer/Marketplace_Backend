import express from 'express';
import { routeError } from '../handlers';

const router: express.Router = express.Router();

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(routeError);

export default router;
