import { NextFunction, Request, Response } from 'express';
import { ThreadService } from '../../core/services/thread.service';
import StatusCodes from '../../utils/enums/http-status-codes';
import { inject } from 'inversify';
import { ThreadTypes } from '../../utils/types/containers/thread.types';
import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from 'inversify-express-utils';
import {
  RequestWithBody,
  RequestWithQuery,
} from '../../utils/types/request.type';
import ThreadModel from '../../core/models/thread.model';
import { ThreadUpdateDto } from '../../utils/dtos/thread/thread-update.dto';
import { ThreadGetAllDto } from '../../utils/dtos/thread/thread-get-all.dto';
import { ThreadCreateInputDto } from '../../utils/dtos/thread/thread-create-input.dto';
import { ThreadGetAllBySectionDto } from '../../utils/dtos/thread/thread-get-all-by-section.dto';
import { ThreadGetAllByAuthorDto } from '../../utils/dtos/thread/thread-get-all-by-author.dto';
import { ThreadGetByIdDto } from '../../utils/dtos/thread/thread-get-by-id.dto';

@controller('/thread')
class ThreadController {
  constructor(
    @inject(ThreadTypes.ThreadService) private threadService: ThreadService,
  ) {}

  @httpPost('/create')
  public async createThread(
    req: RequestWithBody<ThreadCreateInputDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const thread = req.body;
      const createdThread = await this.threadService.createThread(thread);
      res.json(createdThread).status(StatusCodes.CREATED);
    } catch (e) {
      next(e);
    }
  }

  @httpDelete('/delete')
  public async deleteThread(
    req: RequestWithBody<ThreadGetByIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { threadId } = req.body;
      await this.threadService.deleteThread(threadId);
      res.sendStatus(StatusCodes.DELETED);
    } catch (e) {
      next(e);
    }
  }

  @httpPut('/update')
  public async updateThread(
    req: RequestWithBody<ThreadUpdateDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const threadUpdateData = req.body;
      const updatedThread =
        await this.threadService.updateThread(threadUpdateData);
      res.json(updatedThread).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/all')
  public async getAllThreads(
    req: RequestWithQuery<ThreadGetAllDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const threads = await this.threadService.getThreads(options);
      res.json(threads).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/allBySection')
  public async getThreadsBySection(
    req: RequestWithQuery<ThreadGetAllBySectionDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const threads = await this.threadService.getThreads({
        where: { section: { title: options.sectionTitle } },
        ...options,
      });
      res.json(threads).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/allByAuthor')
  public async getThreadsByAuthor(
    req: RequestWithQuery<ThreadGetAllByAuthorDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const options = req.query;
      const threads = await this.threadService.getThreads({
        where: { author: { id: options.authorId } },
        ...options,
      });
      res.json(threads).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }

  @httpGet('/')
  public async getThreadById(
    req: RequestWithQuery<ThreadGetByIdDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { threadId } = req.query;
      const thread = await this.threadService.getThreadById(threadId);
      res.json(thread).status(StatusCodes.SUCCESS);
    } catch (e) {
      next(e);
    }
  }
}

export default ThreadController;
