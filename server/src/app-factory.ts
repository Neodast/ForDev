import { App } from './api/app';
import { interfaces } from 'inversify';

export class AppFactory {
  public static create(appContainer: interfaces.Container) {
    const app = new App(appContainer);
    return app;
  }
}
