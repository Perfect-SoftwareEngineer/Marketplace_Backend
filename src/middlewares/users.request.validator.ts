import { Validator } from './validator';
import { body, param } from 'express-validator';

export const signupUserValidator = () => {
  return Validator.validate([
    body('public_address', 'public_address is required')
      .exists()
      .bail(),
  ]);
};

export const updateUserValidator = () => {
  return Validator.validate([
    param('public_address', 'public_address is required'),
    body('username', 'username is required')
      .isLength({ min: 3, max: 50 })
      .bail(),
  ]);
};
