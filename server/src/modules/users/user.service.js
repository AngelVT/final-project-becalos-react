import * as userRepo from './user.repository.js';
import ValidationError from '../../errors/ValidationError.js';
import * as userValidation from '../../validation/user.validation.js';
import jwt from 'jsonwebtoken';
import { IM_SECRET_JWT } from '../../config/environment.config.js';
import { appVariables } from '../../config/environment.config.js';

export async function requestUserCreation(name, username, password) {
    if (!name || !username || !password) {
        throw new ValidationError("There is missing information please make sure that you are providing a name, email and a password.");
    }

    if (!userValidation.isValidName(name)) {
        throw new ValidationError("The name provided is invalid please provide a valid name.");
    }

    if (!userValidation.isValidEmail(username)) {
        throw new ValidationError("The email provided is invalid please provide a valid email.");
    }

    if (!userValidation.isStrongPassword(password)) {
        throw new ValidationError("The password provided is too weaK please provide a password with at least 8 characters, one uppercase, one lowercase, one number and one special character.");
    }

    const newUser = await userRepo.createUser(name, username, password);

    if (!newUser) {
        throw new ValidationError(`Unable to create account due to the email ${username} is already registered.`);
    }

    const token = jwt.sign({
        sub: "auth",
        userID: newUser.user_uuid,
        username: newUser.username
    },
        IM_SECRET_JWT,
        {
            algorithm: 'HS256',
            expiresIn: appVariables.TOKENS_EXP
        }
    );

    return {
        token,
        response: {
            user: newUser
        }
    }
}