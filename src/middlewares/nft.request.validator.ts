import { Validator } from './validator';
import { body, param } from 'express-validator';
import { Attribute } from '../interfaces/nft';

const validateValueExists = (attributes: Attribute[]) => {
  for (const attribute of attributes) {
    if (!attribute.value) {
      return false;
    }
  }
  return true;
};

export const addMetadataValidator = () => {
  return Validator.validate([
    param('collectionId', 'max collectionId character length is 3 to 20')
      .isLength({ min: 3, max: 20 }),
    param('tokenId').isLength({ min: 1 }),
    body('image', 'image url provided is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('image_data', 'image_data provided is not a valid SVG')
      .optional()
      .custom((value: string) => value.startsWith('<svg'))
      .bail(),
    body('external_url', 'external_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('description', 'description is required')
      .exists()
      .isLength({ min: 4 })
      .bail(),
    body('name', 'name is required')
      .exists()
      .isLength({ min: 3, max: 50 })
      .bail(),
    body('attributes')
      .exists()
      .isArray()
      .withMessage('attributes array is required')
      .custom((attributes: Attribute[]) => validateValueExists(attributes))
      .withMessage('property value is required for all attributes')
      .bail(),
    body('background_color', 'background_color should be a valid hex color')
      .optional()
      .isHexColor()
      .bail(),
    body('animation_url', 'animation_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('youtube_url', 'youtube_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
  ]);
};

export const getAllMetadataValidator = () => {
  return Validator.validate([
    param('collectionId', 'max collectionId character length is 3 to 20')
      .isLength({ min: 3, max: 20 }),
  ]);
};

export const singleMetadataValidator = () => {
  return Validator.validate([
    param('collectionId', 'max collectionId character length is 3 to 20')
      .isLength({ min: 3, max: 20 }),
    param('tokenId', 'tokenId is required')
      .exists(),
  ]);
};

export const updateMetadataValidator = () => {
  return Validator.validate([
    param('collectionId', 'max collectionId character length is 3 to 20')
      .isLength({ min: 3, max: 20 }),
    param('tokenId', 'tokenId is required')
      .exists(),
    body('image', 'image url provided is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('image_data', 'image_data provided is not a valid SVG')
      .optional()
      .custom((value: string) => value.startsWith('<svg'))
      .bail(),
    body('external_url', 'external_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('description', 'description is required')
      .optional()
      .isLength({ min: 4 })
      .bail(),
    body('name', 'name is required')
      .optional()
      .isLength({ min: 3, max: 50 })
      .bail(),
    body('attributes')
      .optional()
      .isArray()
      .withMessage('attributes array is required')
      .custom((attributes: Attribute[]) => validateValueExists(attributes))
      .withMessage('property value is required for all attributes')
      .bail(),
    body('background_color', 'background_color should be a valid hex color')
      .optional()
      .isHexColor()
      .bail(),
    body('animation_url', 'animation_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
    body('youtube_url', 'youtube_url is not a valid url')
      .optional()
      .isURL()
      .bail(),
  ]);
};
