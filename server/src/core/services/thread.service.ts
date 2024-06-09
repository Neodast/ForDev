import { inject, injectable } from 'inversify';
import ThreadModel from '../models/thread.model';
import ThreadRepository from '../repositories/thread.repository.type';
import { ThreadTypes } from '../../utils/types/containers/thread.types';

@injectable()
export class ThreadService {
  constructor(
    @inject(ThreadTypes.ThreadRepository)
    private threadRepository: ThreadRepository,
  ) {}

  public async createThread(threadData: ThreadModel): Promise<ThreadModel> {
    return this.threadRepository.createThread(threadData);
  }

  public async deleteThread(thread: ThreadModel): Promise<void> {
    const dbPost = await this.threadRepository.getById(thread.id);
    return this.threadRepository.deleteThread(dbPost);
  }

  public async getAllThreads(): Promise<ThreadModel[]> {
    return this.threadRepository.getAll();
  }
}