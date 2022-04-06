import { Validator } from './validator';
import { body, param } from 'express-validator';
import { ADMIN_ADDRESSES } from '../constants';

export const signupAdminValidator = () => {
  return Validator.validate([
    body('public_address', 'public_address is required')
      .exists()
      .isIn(ADMIN_ADDRESSES)
      .bail(),
  ]);
};

export const updateAdminValidator = () => {
  return Validator.validate([
    param('public_address', 'public_address is required')
      .isIn(ADMIN_ADDRESSES).bail(),
    body('username', 'username is required')
      .isLength({ min: 3, max: 50 })
      .bail(),
  ]);
};
