import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import 'reflect-metadata';

dotenv.config();

const pgDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'neo',
  password: process.env.POSTGRES_PASSWORD || 'pass',
  database: process.env.POSTGRES_DB || 'fordev',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/entities/*entity.{js,ts}'],
  migrations: [],
  subscribers: [],
});

const mongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: Number(process.env.MONGO_PORT) || 27017,
  database: 'fordev',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/entities/mongoDB/*Entity.{js,ts}'],
});

export { pgDataSource, mongoDataSource };
