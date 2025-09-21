import jwt from "jsonwebtoken";
import { IM_SECRET_JWT } from "../config/environment.config.js";
import { findUserUUIDUsername } from "../modules/auth/auth.repository.js";

export async function verifyToken(req, res, next) {
    const token = req.signedCookies.access_token;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, IM_SECRET_JWT, { algorithms: ['HS256'] });
        
        if (!decoded.userID || !decoded.username) {
            return res.status(401).json({ msg: 'Invalid token provided' });
        }

        const user = await findUserUUIDUsername(decoded.userID, decoded.username);

        if (!user) {
            return res.status(401).json({ msg: 'Invalid token provided' });
        }

        req.user = {};
        req.user.userID = user.id;
        req.user.name = user.name;
        req.user.username = user.username;

        next();
    } catch(error) {
        console.log(error);
        return res.status(403).json({ msg: "Forbidden: unable to authenticate token" });
    }
}