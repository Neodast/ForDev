import express, { Application } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appDataSource from './db/appDataSourse';
import router from './api/routes/routes';
import errorMiddleware from './api/helpers/middlewares/error.middleware';

class App {
  private app: Application;
  private readonly port: number = Number(process.env.SERVER_PORT) || 3000;

  private initializeApp() {
    try {
    } catch (e) {
      console.log(e);
    }
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
    this.app.use('/', router);
    this.app.use(errorMiddleware);
  }

  public async startServer() {
    try {
      this.initializeApp();
      await appDataSource.initialize();
      this.app.listen(this.port, async () => {
        console.log(`Example app listening on port ${this.port}!`);
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const application = new App();
application.startServer();
