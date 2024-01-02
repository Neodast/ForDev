import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

dotenv.config();

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'neo',
  password: process.env.POSTGRES_PASSWORD || 'pass',
  database: process.env.POSTGRES_DB || 'fordev',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../**/*Entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});

export default appDataSource;
