import { dataSource } from './utils/types/data-source.type';
import { App } from './api/app';

export class AppFactory {
  public static create(dataSource?: dataSource) {
    const app = new App(dataSource);
    return app;
  }
}
