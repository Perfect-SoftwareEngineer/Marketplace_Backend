import express from 'express';
import * as controller from '../controlllers/user.controller';
import { signupUserValidator, updateUserValidator } from '../middlewares';
import { JwtHelper } from '../helpers/jwt.helper';
import { JWT_PUBLIC_KEY } from '../constants';
import { RoleType } from '../interfaces/jwt.config';

const router = express.Router();
const jwtHelper = new JwtHelper({ publicKey: JWT_PUBLIC_KEY });

// Add a user
router.post('/', signupUserValidator(), controller.handleAddUser);

// Get users
router.get('/', controller.handleGetUsers);

// Update username for a user
router.put(
  '/:public_address',
  jwtHelper.requirePermission(RoleType.USER),
  updateUserValidator(),
  controller.handleUpdateUser,
);


export default router;
