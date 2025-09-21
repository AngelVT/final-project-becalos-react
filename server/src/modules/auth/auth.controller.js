import { requestHandler } from "../../utils/request.utils.js";
import * as authService from './auth.service.js';
import { appVariables } from "../../config/environment.config.js";

export const signIn = requestHandler(async (req, res) => {
    const { username, password } = req.body;

    const tokenUserInfo = await authService.requestToken(username, password);
    
    res.cookie("access_token", tokenUserInfo.token, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
        maxAge: appVariables.COOKIE_EXP
    });
    
    return res.status(200).json({ msg: "Access granted" });
});

export const signOut = async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
    });

    return res.status(200).json({ msg: "Logged out" });
}