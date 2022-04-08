import express from 'express';
import * as controller from '../controlllers/user.controller';
import { signupUserValidator, updateUserValidator } from '../middlewares';

const router = express.Router();

// Add a user
router.post('/', signupUserValidator(), controller.handleAddUser);

// Get users
router.get('/', controller.handleGetUsers);

// Update username for a user
router.put('/:public_address', updateUserValidator(), controller.handleUpdateUser);


export default router;
