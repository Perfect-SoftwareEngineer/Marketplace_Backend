import express from 'express';
import * as controller from '../controlllers/admin.controller';
import { signupAdminValidator, updateAdminValidator } from '../middlewares/admin.validator';

const router = express.Router();

// Add a admin
router.post('/', signupAdminValidator(), controller.handleAddAdmin);

// Get admins
router.get('/', controller.handleGetAdmins);

// Update username for an admin
router.put('/:public_address', updateAdminValidator(), controller.handleUpdateAdmin);


export default router;
