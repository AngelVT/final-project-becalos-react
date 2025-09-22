import { DataTypes } from "sequelize";
import { pool } from "../../../config/database.config.js";

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
                min: 0,
                max: 10,
            },
        },
    },
    {
        timestamps: false,
        schema: 'points'
    }
);

export default Rating;