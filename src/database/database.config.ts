import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  seeds: unknown[];
  entities: string[];
  synchronize: boolean;
  migrations: string[];
  cli: {
    migrationsDir: string;
  };
}

export default (configService: ConfigService) => {
  const config: {
    [env: string]: DatabaseConfig
  } = {
    development: {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [
        __dirname + '/**/*.entity{.ts,.js}', 
        __dirname + '../**/*.entity{.ts,.js}',
      ],
      seeds: [
        __dirname + '/../**/*.seed{.ts,.js}',
      ],
      migrations: [__dirname + '/migrations/*.ts'],
      cli: {
          migrationsDir: __dirname + '/migrations',
        },
      synchronize: false,
    },
    production: {
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [
        __dirname + '/**/*.entity{.ts,.js}', 
        __dirname + '../**/*.entity{.ts,.js}',
      ],
      seeds: [
        __dirname + '/../**/*.seed{.ts,.js}',
      ],
      migrations: [__dirname + '/migrations/*.js'], // Em produção, geralmente usamos JS compilado
      cli: {
        migrationsDir: __dirname + '/migrations',
      },
      synchronize: false,
    }
  }
  return config[process.env.NODE_ENV];
};