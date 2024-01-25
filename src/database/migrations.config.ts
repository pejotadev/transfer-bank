import typeOrmConfig from './database.config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';
const validEnvironments = ['development', 'test', 'production'];

if (!validEnvironments.includes(env)) {
  throw new Error(`Invalid NODE_ENV: ${env}`);
}

export default new DataSource({
  ...typeOrmConfig[env],
  migrations: [process.env.DB_MIGRATIONS_DIR || 'src/database/migrations/*.ts'],
});
