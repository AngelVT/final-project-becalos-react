import { Router } from 'express';
import * as userControl from './user.controller.js'

const router = Router();

router.post('/register', userControl.createUser);

export default router;