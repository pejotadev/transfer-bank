import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env'});
dotenv.config({ path: `.env.${process.env.NODE_ENV}`});

interface DatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

function createDatabaseConfig(): DatabaseConfig {
  return {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'toor',
    database: process.env.DB_DATABASE || 'transferBank',
  };
}

const typeOrmConfig: {
  [key: string]: DatabaseConfig;
} = {
  development: createDatabaseConfig(),
  test: createDatabaseConfig(),
  production: createDatabaseConfig(),
};

export default typeOrmConfig;
