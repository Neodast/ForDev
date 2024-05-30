import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import { dataSource } from '../utils/types/data-source.type';
import { InversifyExpressServer } from 'inversify-express-utils';
import { appContainer } from './app.container';

export class App {
  private app: express.Application;
  private server: InversifyExpressServer;

  constructor(dataSource?: dataSource) {
    this.createServer();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    if (dataSource) {
      this.initializeDB(dataSource);
    }
  }

  private createServer() {
    this.server = new InversifyExpressServer(appContainer);
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
