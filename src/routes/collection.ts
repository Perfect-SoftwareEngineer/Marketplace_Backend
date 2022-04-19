import express from 'express';
import * as controller from '../controlllers/collection.info.controller';
import { addCollectionValidator, updateCollectionValidator, } from '../middlewares';
import { JwtHelper } from '../helpers/jwt.helper';
import { JWT_PUBLIC_KEY } from '../constants';
import { RoleType } from '../interfaces/jwt.config';

const router = express.Router();
const jwtHelper = new JwtHelper({ publicKey: JWT_PUBLIC_KEY });

// Add a collection
router.post(
  '/',
  jwtHelper.requirePermission(RoleType.ADMIN),
  addCollectionValidator(),
  controller.handleAddCollection
);

// Get all collections
router.get(
  '/',
  controller.handleGetAllCollections
);

// Get a collection
router.get(
  '/:collection_id',
  controller.handleGetCollection
);

// Update info for a collection
router.put(
  '/:collection_id',
  jwtHelper.requirePermission(RoleType.ADMIN),
  updateCollectionValidator(),
  controller.handleUpdateCollectionInfo
);

// Delete collection info
router.delete(
  '/:collection_id',
  jwtHelper.requirePermission(RoleType.ADMIN),
  controller.handleDeleteCollectionIfo
);


export default router;
