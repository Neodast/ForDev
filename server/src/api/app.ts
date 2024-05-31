import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';
import { dataSource } from '../utils/types/data-source.type';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'reflect-metadata';
import { interfaces } from 'inversify';
import { DataTypes } from '../utils/types/containers/database.types';

export class App {
  private app: express.Application;
  private server: InversifyExpressServer;

  constructor(appContainer: interfaces.Container) {
    this.createServer(appContainer);
    this.initializeMiddlewares();
    this.initializeErrorHandling();
  }

  private async createServer(appContainer: interfaces.Container) {
    this.server = new InversifyExpressServer(appContainer);
    const dataSource = appContainer.get<dataSource>(DataTypes.DataSource);
    if (dataSource) {
      await this.initializeDB(dataSource);
    }
  }

  private initializeMiddlewares() {
    this.server.setConfig((app) => {
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser());
      app.use(
        cors({
          credentials: true,
          origin: String(process.env.CLIENT_URL) || 'http://localhost:5173',
        }),
      );
    });
  }

  private initializeErrorHandling() {
    this.server.setErrorConfig((app) => {
      app.use(errorMiddleware);
    });
  }

  private async initializeDB(dataSource: dataSource) {
    await dataSource.initialize();
  }

  public async listen(port: number) {
    try {
      this.app = this.server.build();
      this.app.listen(port, async () => {
        console.log(`Example app listening on port ${port}!`);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
