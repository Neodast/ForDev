import 'reflect-metadata';
import { AppFactory } from './app-factory';
import { appContainer } from './app.container';

const application = AppFactory.create(appContainer);
application.listen(Number(process.env.SERVER_PORT) || 3000);
