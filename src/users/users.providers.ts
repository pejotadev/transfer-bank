import { USERS_REPOSITORY, DATA_SOURCE } from '../constants';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    inject: [DATA_SOURCE],
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  },
];
