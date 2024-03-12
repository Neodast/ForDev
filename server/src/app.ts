import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appDataSource from './db/appDataSourse';
import router from './api/routes/routes';
import errorMiddleware from './api/middlewares/error.middleware';

const app = express();
const port = Number(process.env.SERVER_PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use('/', router);
app.use(errorMiddleware);

async function start() {
  try {
    await appDataSource.initialize();
  } catch (e) {
    console.log(e);
  }
  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`);
  });
}

start();
