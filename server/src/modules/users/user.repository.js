import User from "./models/user.model.js";

export async function createUser(name, username, password) {
    const [createdUser, created] = await User.findOrCreate({
        where: { username },
        defaults: { name, username, password }
    });

    if (!created) return null;

    const safeUser = await User.findOne({
        where: { user_id: createdUser.user_id },
        attributes: { exclude: ["user_id", "password"] }
    });

    return safeUser;
}