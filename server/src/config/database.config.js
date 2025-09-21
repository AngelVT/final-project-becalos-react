import { Sequelize } from "sequelize";
import { IM_DB_DATABASE, IM_DB_USER, IM_DB_PASSWORD, IM_DB_HOST, IM_DB_PORT, IM_DB_DIALECT, IM_DB_TIMEZONE, IM_DEFAULT_USER, IM_DEFAULT_PASSWORD } from './environment.config.js';
import User from "../modules/users/models/user.model.js";

export const pool =  new Sequelize(IM_DB_DATABASE, IM_DB_USER, IM_DB_PASSWORD, {
    host: IM_DB_HOST,
    port: IM_DB_PORT,
    dialect: IM_DB_DIALECT,
    logging: false,
    timezone: IM_DB_TIMEZONE
});

export async function initSchemas() {
    await pool.query('CREATE SCHEMA IF NOT EXISTS users');
}

export async function syncModels() {
    await User.sync();
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