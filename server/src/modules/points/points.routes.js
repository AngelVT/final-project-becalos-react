import { Router } from "express";
import * as pointControl from './points.controller.js';
import { verifyToken } from "../../middlewares/authentication.js";

const router = Router();

router.get('/all', pointControl.getAllPoints);

router.put('/rate/:pointID', verifyToken, pointControl.ratePoint);

router.post('/register', verifyToken, pointControl.createPoint);

export default router;