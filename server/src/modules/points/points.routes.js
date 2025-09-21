import { Router } from "express";
import * as pointControl from './points.controller.js';

const router = Router();

router.post('/register', pointControl.createPoint);

export default router;