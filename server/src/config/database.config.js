import { Sequelize } from "sequelize";
import { IM_DB_DATABASE, IM_DB_USER, IM_DB_PASSWORD, IM_DB_HOST, IM_DB_PORT, IM_DB_DIALECT, IM_DB_TIMEZONE } from './environment.config.js';

export const pool =  new Sequelize(IM_DB_DATABASE, IM_DB_USER, IM_DB_PASSWORD, {
    host: IM_DB_HOST,
    port: IM_DB_PORT,
    dialect: IM_DB_DIALECT,
    logging: false,
    timezone: IM_DB_TIMEZONE,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export async function initSchemas() {
    await pool.query('CREATE SCHEMA IF NOT EXISTS users');
    await pool.query('CREATE SCHEMA IF NOT EXISTS points');
}

export async function initExtensions() {
    await pool.query('CREATE EXTENSION IF NOT EXISTS postgis');
}