import 'reflect-metadata';
import { pgDataSource } from './db/appDataSourse';
import { AppFactory } from './AppFactory';

const application = AppFactory.create(pgDataSource);
application.listen(Number(process.env.SERVER_PORT) || 3000);
