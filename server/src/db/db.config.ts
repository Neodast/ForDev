import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { env } from '../utils/env.scheme';

const pgDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/entities/*entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});

export { pgDataSource };
