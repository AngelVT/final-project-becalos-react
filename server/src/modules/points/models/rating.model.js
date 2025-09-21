import { DataTypes, ExclusionConstraintError } from "sequelize";
import { pool } from "../../../config/database.config.js";
import User from "../../users/models/user.model.js";
import Point from "./point.model.js";

const Rating = pool.define(
    "rating",
    {
        rating_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5, // or whatever range you want
            },
        },
    },
    {
        timestamps: false,
        schema: 'points'
    }
);

// Associations
User.belongsToMany(Point, { through: Rating, foreignKey: "user_id" });
Point.belongsToMany(User, { through: Rating, foreignKey: "point_id" });
Rating.belongsTo(User, { foreignKey: "user_id" });
Rating.belongsTo(Point, { foreignKey: "point_id" });

export default Rating;