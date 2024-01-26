import { DATA_SOURCE } from '../constants';
import { DataSource } from 'typeorm';
import databaseConfig from './database.config';
import { User } from 'src/users/entities/user.entity';

const env = process.env.NODE_ENV || 'development';
const validEnvironments = ['development', 'test', 'production'];

if (!validEnvironments.includes(env)) {
  throw new Error(`Invalid NODE_ENV: ${env}`);
}

const config = databaseConfig[env];

let dataSourceInstance: DataSource | null = null;

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      if (!dataSourceInstance) {
        dataSourceInstance = new DataSource({
          ...config,
          entities: [
           'src/modules/**/entities/*.entity.ts',
           User
          ],
          synchronize: false,
        });
        await dataSourceInstance.initialize();

      }
      return dataSourceInstance;
    },
  },
];
