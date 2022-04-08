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

const ENDPOINT = '/:collection_id/metadata';

// Add metadata
router.post([ENDPOINT, `${ENDPOINT}/:token_id`], sanitizeAddMetadataBody, addMetadataValidator(), controller.handleAddMetadata);

// Get all metadata for a collection
router.get(ENDPOINT, getAllMetadataValidator(), controller.handleGetAllMetadata);

// Get metadata for a collection item
router.get(`${ENDPOINT}/:token_id`, singleMetadataValidator(), controller.handleGetMetadata);

// Update metadata for a collection item
router.put(`${ENDPOINT}/:token_id`, sanitizeAddMetadataBody, updateMetadataValidator(), controller.handleUpdateMetadata);

// Delete metadata for all items for a collection
router.delete(ENDPOINT, controller.handleDeleteMetadata);

// Delete metadata for a collection item
router.delete(`${ENDPOINT}/:token_id`, singleMetadataValidator(), controller.handleDeleteMetadata);

export default router;
