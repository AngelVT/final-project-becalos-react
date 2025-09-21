import { DataTypes } from "sequelize";
import { pool } from "../../../config/database.config.js";

const Point = pool.define(
    "point",
    {
        point_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        location: {
            type: DataTypes.GEOMETRY("POINT", 4326),
            allowNull: false,
        },
    },
    {
        timestamps: false,
        schema: 'points'
    }
);

export default Point;