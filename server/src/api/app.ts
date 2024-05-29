import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/router';
import errorMiddleware from './middlewares/error.middleware';
import { dataSource } from '../utils/types/data-source.type';

export class App {
  private app: express.Application;

  constructor(dataSource?: dataSource) {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    if (dataSource) {
      this.initializeDB(dataSource);
    }
  }

  private initializeMiddlewares() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        credentials: true,
        origin: String(process.env.CLIENT_URL) || 'http://localhost:5173',
      }),
    );
  }

  private initializeRoutes() {
    this.app.use('/', router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async initializeDB(dataSource: dataSource) {
    await dataSource.initialize();
  }

  public async listen(port: number) {
    try {
      this.app.listen(port, async () => {
        console.log(`Example app listening on port ${port}!`);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
