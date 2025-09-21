import * as authRepo from './auth.repository.js';
import ValidationError from '../../errors/ValidationError.js';
import { IM_SECRET_JWT } from '../../config/environment.config.js';
import { appVariables } from '../../config/environment.config.js';
import jwt from 'jsonwebtoken';

export async function requestToken(username, password) {
    if (!username || !password) {
        throw new ValidationError('Sign in information not provided.');
    }

    const user = await authRepo.findAndAuthenticateUser(username, password);

    const token = jwt.sign({
            sub: "auth",
            userID: user.user_uuid,
            username: user.username
        },
        IM_SECRET_JWT,
        {
            algorithm: 'HS256',
            expiresIn: appVariables.TOKENS_EXP
        }
    );

    return {
        token
    }
}