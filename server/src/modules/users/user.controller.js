import { requestHandler } from "../../utils/request.utils.js";
import * as userService from './user.service.js';
import { appVariables } from "../../config/environment.config.js";

export const createUser = requestHandler(
    async function (req, res) {
        const { name, username, password } = req.body;

        const response = await userService.requestUserCreation(name, username, password);

        res.cookie("access_token", response.token, {
            httpOnly: true,
            secure: true,
            signed: true,
            sameSite: 'strict',
            maxAge: appVariables.COOKIE_EXP
        });

        res.status(200).json(response.response);
    }
);