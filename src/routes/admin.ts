import express from 'express';
import * as controller from '../controlllers/admin.controller';
import { signupAdminValidator, updateAdminValidator } from '../middlewares/admin.validator';
import { RoleType } from '../interfaces/jwt.config';
import { JwtHelper } from '../helpers/jwt.helper';
import { JWT_PUBLIC_KEY } from '../constants';

const router = express.Router();
const jwtHelper = new JwtHelper({ publicKey: JWT_PUBLIC_KEY });

// Add a admin
router.post('/', signupAdminValidator(), controller.handleAddAdmin);

// Get admins
router.get('/', controller.handleGetAdmins);

// Update username for an admin
router.put(
  '/:public_address',
  jwtHelper.requirePermission(RoleType.ADMIN),
  updateAdminValidator(),
  controller.handleUpdateAdmin);


export default router;
