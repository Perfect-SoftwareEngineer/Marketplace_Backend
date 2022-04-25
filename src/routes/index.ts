import express from 'express';

import { routeError } from '../handlers';

import nftRoutes from './nft';
import collectionRoutes from './collection';
import usersRoutes from './users';
import adminRoutes from './admin';
import apiDocsRoutes from './api.docs';

const router: express.Router = express.Router();

router.use('/collections', collectionRoutes);
router.use('/nft', nftRoutes);
router.use('/users', usersRoutes);
router.use('/admin', adminRoutes);
router.use('/api-docs', apiDocsRoutes);

router.use('/health', (req, res) => {
  res.send({ status: 'OK' });
});

router.use(routeError);

export default router;
