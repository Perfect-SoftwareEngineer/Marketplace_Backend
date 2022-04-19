import express from 'express';
import * as controller from '../controlllers/metadata.controller';
import {
  addMetadataValidator,
  getAllMetadataValidator,
  singleMetadataValidator,
  updateMetadataValidator
} from '../middlewares';
import { sanitizeAddMetadataBody } from '../middlewares';
import { RoleType } from '../interfaces/jwt.config';
import { JwtHelper } from '../helpers/jwt.helper';
import { JWT_PUBLIC_KEY } from '../constants';

const router = express.Router();
const jwtHelper = new JwtHelper({ publicKey: JWT_PUBLIC_KEY });

const ENDPOINT = '/:collection_id/metadata';

// Add metadata
router.post(
  `${ENDPOINT}/:token_id`,
  jwtHelper.requirePermission(RoleType.ADMIN),
  sanitizeAddMetadataBody,
  addMetadataValidator(),
  controller.handleAddMetadata
);

// Get all metadata for a collection
router.get(ENDPOINT, getAllMetadataValidator(), controller.handleGetAllMetadata);

// Get metadata for a collection item
router.get(`${ENDPOINT}/:token_id`, singleMetadataValidator(), controller.handleGetMetadata);

// Update metadata for a collection item
router.put(
  `${ENDPOINT}/:token_id`,
  jwtHelper.requirePermission(RoleType.ADMIN),
  sanitizeAddMetadataBody,
  updateMetadataValidator(),
  controller.handleUpdateMetadata
);

// Delete metadata for all items for a collection
router.delete(
  ENDPOINT,
  jwtHelper.requirePermission(RoleType.ADMIN),
  controller.handleDeleteMetadata
);

// Delete metadata for a collection item
router.delete(
  `${ENDPOINT}/:token_id`,
  singleMetadataValidator(),
  jwtHelper.requirePermission(RoleType.ADMIN),
  controller.handleDeleteMetadata
);

export default router;
