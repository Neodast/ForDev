import { NextFunction, Request, Response } from 'express';
import ThreadService from '../../core/services/thread.service';
import threadModel from '../../core/models/thread.model';
import StatusCodes from '../../utils/enums/http-status-codes';

class ThreadController {
  public async createThread(req: Request, res: Response, next: NextFunction) {
    try {
      const thread: threadModel = req.body;
      const createdThread: threadModel =
        await ThreadService.createThread(thread);
      res.json(createdThread).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  public async deleteThread(req: Request, res: Response, next: NextFunction) {
    try {
      const thread: threadModel = req.body;
      await ThreadService.deleteThread(thread);
      res.sendStatus(StatusCodes.DELETED);
    } catch (e) {
      next(e);
    }
  }

  async getAllThreads(req: Request, res: Response, next: NextFunction) {
    try {
      const threads = await ThreadService.getAllThreads();
      res.json(threads).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default new ThreadController();
