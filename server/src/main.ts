import 'reflect-metadata';
import { AppFactory } from './app-factory';
import { appContainer } from './app.container';
import { env } from './utils/env.scheme';

const bootstrap = () => {
  const application = AppFactory.create(appContainer);
  application.listen(env.SERVER_PORT || 3000);
}

bootstrap();