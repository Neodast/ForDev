import { NextFunction, Request, Response } from 'express';
import threadService from '../../core/services/threadService';
import threadModel from '../../core/models/threadModel';

class ThreadController {
  public async createThread(req: Request, res: Response, next: NextFunction) {
    try {
      const thread: threadModel = req.body;
      const createdThread: threadModel = await threadService.createThread(thread);
      res.json(createdThread);
    } catch (e) {
      next(e);
    }
  }

  public async deleteThread(req: Request, res: Response, next: NextFunction) {
    try {
      const thread: threadModel = req.body;
      res.send(threadService.deleteThread(thread));
    } catch (e)    {
      next(e);
    }
  }

  async getAllThreads(req: Request, res: Response, next: NextFunction) {
    try {
      const threads = await threadService.getAllThreads();
      res.json(threads);
    } catch (e) {
      next(e);
    }
  }
}

export default new ThreadController();