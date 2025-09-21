import User from "../users/models/user.model.js";
import AuthenticationError from "../../errors/AuthenticationError.js";

export async function findAndAuthenticateUser(username, password) {
    const user = await User.findOne({ where: { username } });

    if (user && await user.validPassword(password)) {
        return user;
    } else {
        throw new AuthenticationError('Incorrect username or password');
    }
}

export async function findUserUUIDUsername(uuid, username) {
    return User.findOne({
        where: {
            user_uuid: uuid,
            username: username
        }
    });
}