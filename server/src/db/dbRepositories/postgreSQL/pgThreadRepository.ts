import { Repository } from 'typeorm';
import ThreadRepository from '../../../core/repositories/ThreadRepository';
import { Thread } from '../../entities/postgreSQL/ThreadEntity';
import { pgDataSource } from '../../appDataSourse';
import PgThreadMapper from '../../dbMappers/postgreSQL/PgThreadMapper';
import ThreadModel from '../../../core/models/ThreadModel';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';
import ApiError from '../../../utils/exceptions/ApiError';

class PgThreadRepository implements ThreadRepository {
  private readonly threadRepository: Repository<Thread>;

  constructor() {
    this.threadRepository = pgDataSource.getRepository(Thread);
  }

  private async findThread(criteria: Record<string, unknown>): Promise<Thread> {
    const dbThread = await this.threadRepository.findOne({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbThread) {
      throw new Error('Thread is not found!');
    }
    return dbThread;
  }

  private async findThreads(
    criteria?: Record<string, unknown>,
  ): Promise<Thread[]> {
    const dbThreads = await this.threadRepository.find({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbThreads.length) {
      throw new Error('Threads are not found!');
    }
    return dbThreads;
  }

  public async getById(id: number): Promise<ThreadModel> {
    return PgThreadMapper.mapToThreadModel(await this.findThread({ id }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<ThreadModel[]> {
    return (await this.findThreads({ author })).map((dbThread) =>
      PgThreadMapper.mapToThreadModel(dbThread),
    );
  }

  public async getAll(): Promise<ThreadModel[]> {
    return (await this.findThreads()).map((dbThread) =>
      PgThreadMapper.mapToThreadModel(dbThread),
    );
  }

  public async createThread(ThreadData: ThreadModel): Promise<ThreadModel> {
    if (!ThreadData) {
      throw ApiError.BadRequest('Thread is undefined!');
    }
    const Thread = this.threadRepository.create(ThreadData);
    return PgThreadMapper.mapToThreadModel(
      await this.threadRepository.save(Thread),
    );
  }

  public async updateThread(
    id: number,
    newThreadData: ThreadModel,
  ): Promise<ThreadModel> {
    const dbThread = await this.getById(id);
    Object.assign(dbThread, newThreadData);
    return PgThreadMapper.mapToThreadModel(
      await this.threadRepository.save(dbThread),
    );
  }

  public async deleteThread(Thread: ThreadModel): Promise<void> {
    const dbThread = await this.findThread({ Thread });
    await this.threadRepository.remove(dbThread);
  }
}

export default new PgThreadRepository();
