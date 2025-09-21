export const {
    IM_API_PORT,
    IM_SECRET_COOKIE,
    IM_SECRET_JWT,
    IM_DB_DATABASE,
    IM_DB_USER,
    IM_DB_PASSWORD,
    IM_DB_HOST,
    IM_DB_PORT,
    IM_DB_DIALECT,
    IM_DB_TIMEZONE,
    IM_DEFAULT_USER,
    IM_DEFAULT_PASSWORD,
    IM_CLIENT_URL
} = process.env;

export const appVariables = {
    TOKENS_EXP: '12h',
    COOKIE_EXP: 43200000,
}