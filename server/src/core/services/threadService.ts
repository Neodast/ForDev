import pgThreadRepository from '../../db/dbRepositories/postgreSQL/pgThreadRepository';
import ThreadModel from '../models/threadModel';
import IThreadRepository from '../repositories/IThreadRepository';

class ThreadService {
  constructor(readonly threadRepository: IThreadRepository) {}

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