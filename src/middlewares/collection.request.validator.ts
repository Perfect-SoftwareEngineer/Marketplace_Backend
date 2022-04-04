import { Validator } from './validator';
import { body, param } from 'express-validator';

export const addCollectionValidator = () => {
  return Validator.validate([
    body('id', 'max collectionId character length is 3 to 20')
      .isLength({ min: 3, max: 20 }),
    body('name', 'name is required')
      .exists()
      .isLength({ min: 3, max: 50 })
      .bail(),
    body('contract_address', 'contract_address is required')
      .exists()
      .bail(),
  ]);
};

export const updateCollectionValidator = () => {
  return Validator.validate([
    param('collectionId', 'collectionId is required'),
    body('name', 'name is required')
      .isLength({ min: 3, max: 50 })
      .bail(),
  ]);
};
