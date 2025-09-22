import User from "../modules/users/models/user.model.js";
import Point from "../modules/points/models/point.model.js";
import Rating from "../modules/points/models/rating.model.js";
import { IM_DEFAULT_USER, IM_DEFAULT_PASSWORD } from "./environment.config.js";

export async function syncModels() {
    await User.sync();
    await Point.sync();
    await Rating.sync();
}

export async function initAssociations() {
    User.belongsToMany(Point, { through: Rating, foreignKey: "user_id" });
    Point.belongsToMany(User, { through: Rating, foreignKey: "point_id" });

    Point.hasMany(Rating, { foreignKey: "point_id", as: "ratings" });
    Rating.belongsTo(Point, { foreignKey: "point_id" });

    Rating.belongsTo(User, { foreignKey: "user_id" });
}

export async function setDefaultUser() {
    if(await User.count() === 0) {
        const createdUser = await User.create({
            name: 'Default User',
            username: IM_DEFAULT_USER,
            password: IM_DEFAULT_PASSWORD,
        });
    }
}