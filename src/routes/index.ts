import express from 'express';
import { routeError } from '../handlers';

import nftRoutes from './nft';
import collectionRoutes from './collection';

const router: express.Router = express.Router();

router.use('/collections', collectionRoutes);
router.use('/nft', nftRoutes);

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(routeError);

export default router;
