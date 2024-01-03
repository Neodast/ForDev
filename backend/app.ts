import express, { Request, Response } from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appDataSource from './src/appDataSourse';
import router from './src/routes/routes';

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

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
