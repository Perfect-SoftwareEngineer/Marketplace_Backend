import express from 'express';
import * as controller from '../controlllers/collection.info.controller';
import { addCollectionValidator, updateCollectionValidator, } from '../middlewares';

const router = express.Router();

// Add a collection
router.post('/', addCollectionValidator(), controller.handleAddCollection);

// Get all collections
router.get('/', controller.handleGetAllCollections);

// Get a collection
router.get('/:collectionId', controller.handleGetCollection);

// Update info for a collection
router.put('/:collectionId', updateCollectionValidator(), controller.handleUpdateCollectionInfo);

// Delete collection info
router.delete('/:collectionId', controller.handleDeleteCollectionIfo);


export default router;
