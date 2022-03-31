import express from 'express';
import * as controller from '../controlllers/metadata.controller';
import {
  addMetadataValidator,
  getAllMetadataValidator,
  singleMetadataValidator,
  updateMetadataValidator
} from '../middlewares';
import { sanitizeAddMetadataBody } from '../middlewares';

const router = express.Router();

const ENDPOINT = '/:collectionId/metadata';

// Add metadata
router.post([ENDPOINT, `${ENDPOINT}/:tokenId`], sanitizeAddMetadataBody, addMetadataValidator(), controller.handleAddMetadata);

// Get all metadata for a collection
router.get(ENDPOINT, getAllMetadataValidator(), controller.handleGetAllMetadata);

// Get metadata for a collection item
router.get(`${ENDPOINT}/:tokenId`, singleMetadataValidator(), controller.handleGetMetadata);

// Update metadata for a collection item
router.put(`${ENDPOINT}/:tokenId`, sanitizeAddMetadataBody, updateMetadataValidator(), controller.handleUpdateMetadata);

// Delete metadata for all items for a collection
router.delete(ENDPOINT, controller.handleDeleteMetadata);

// Delete metadata for a collection item
router.delete(`${ENDPOINT}/:tokenId`, singleMetadataValidator(), controller.handleDeleteMetadata);

export default router;
