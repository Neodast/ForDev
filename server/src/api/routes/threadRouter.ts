import express, { Router } from 'express';
import threadController from '../controllers/threadController';
const threadRouter: Router = express.Router();

threadRouter.get('/threads', threadController.getAllThreads);
threadRouter.post('/newThread', threadController.createThread);
threadRouter.delete('/deleteThread', threadController.deleteThread);

export default threadRouter;
