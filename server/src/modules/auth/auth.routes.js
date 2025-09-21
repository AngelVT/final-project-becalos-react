import { Router } from "express";
import * as authControl from './auth.controller.js';
import { verifyToken } from "../../middlewares/authentication.js";

const router = Router();

router.post('/signin', authControl.signIn);

router.post('/signout', authControl.signOut);

router.get('/check', verifyToken, (req, res) => {
    res.json({ msg: "Authenticated", user: req.user.username });
})

export default router;