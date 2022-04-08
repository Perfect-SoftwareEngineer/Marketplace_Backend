import express from 'express';
import * as controller from '../controlllers/auth.controller';
import { authValidator } from '../middlewares/auth.validator';

const router = express.Router();

router.post('/:user_type', authValidator(), controller.handleAuth);

export default router;
