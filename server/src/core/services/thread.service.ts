import pgThreadRepository from '../../db/dbRepositories/thread.repository';
import ThreadModel from '../models/thread.model';
import ThreadRepository from '../repositories/thread.repository.type';

class ThreadService {
  constructor(readonly threadRepository: ThreadRepository) {}

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

export default new ThreadService(pgThreadRepository);
