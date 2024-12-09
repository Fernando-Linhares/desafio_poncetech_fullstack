/**
 * -----------------------------------------------------------------------------
 *    Application data config
 * -----------------------------------------------------------------------------
 */
export const app_name = process.env.APP_NAME || 'PONCE_TECH_CHALLENGER';
export const app_key = process.env.APP_SECRET_KEY || 'sha1|219bc881c31fab246a00f3f2691823a9fc4284a1';
export const app_version = process.env.APP_VERSION || '1.0.0';
export const app_env = process.env.APP_ENV || 'development';

/**
 * -----------------------------------------------------------------------------
 *    Base url's config
 * -----------------------------------------------------------------------------
 */
export const backend_url = process.env.BACKEND_URL || 'https://localhost:3000';
export const frontend_url = process.env.FRONTEND_URL || 'https://localhost:8080';

/**
 * -----------------------------------------------------------------------------
 *    Database configuration
 * -----------------------------------------------------------------------------
 */
export const db_driver = process.env.DB_DRIVER || 'postgresql';
export const db_host = process.env.DB_HOST || 'localhost';
export const db_port = process.env.DB_PORT || '5432';
export const db_user_name = process.env.DB_USER_NAME || 'root';
export const db_user_password = process.env.DB_USER_PASSWORD || '$trongP4ssw0rd';
export const db_name = process.env.DB_NAME || 'app_db';
export const database_url = process.env.DATABASE_URL
    || `${db_driver}://${db_user_name}:${db_user_password}@${db_host}:${db_port}/${db_name}?schema=public`;