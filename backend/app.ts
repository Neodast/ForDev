import express, { Request, Response } from 'express';
import 'reflect-metadata';
import appDataSource from './src/appDataSourse';
import router from './src/routes/routes';

const app = express();
const port = 3000;

app.use('/', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
