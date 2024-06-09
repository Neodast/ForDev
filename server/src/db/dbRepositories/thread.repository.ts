import { Repository } from 'typeorm';
import ThreadRepository from '../../core/repositories/thread.repository.type';
import { Thread } from '../entities/thread.entity';
import { pgDataSource } from '../db.config';
import PgThreadMapper from '../dbMappers/thread.db-mapper';
import ThreadModel from '../../core/models/thread.model';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import ApiError from '../../utils/exceptions/api-error';
import { id, injectable } from 'inversify';
import { ThreadUpdateDto } from '../../utils/dtos/thread/thread-update.dto';
import { DataOptions } from '../../utils/types/data-options';
import { ThreadCreateDto } from '../../utils/dtos/thread/thread-create.dto';

@injectable()
class PgThreadRepository implements ThreadRepository {
  private readonly threadRepository: Repository<Thread>;

  constructor() {
    this.threadRepository = pgDataSource.getRepository(Thread);
  }

  private async findThread(where: Record<string, unknown>): Promise<Thread> {
    const dbThread = await this.threadRepository.findOne({
      where: where,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbThread) {
      throw new Error('Thread is not found!');
    }
    return dbThread;
  }

  private async findThreads(options: DataOptions): Promise<Thread[]> {
    const sortableFields = ['creationDate', 'title', 'author', 'id'];
    if (!options.sortBy || !sortableFields.includes(options.sortBy)) {
      options.sortBy = 'creationDate';
    }

    let orderOption: Record<string, string> = {};
    orderOption[options.sortBy] = 'ASC';

    const dbThreads = await this.threadRepository.find({
      order: orderOption,
      where: options.where,
      take: options.take,
      skip: options.skip,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbThreads.length) {
      throw new Error('Threads are not found!');
    }
    return dbThreads;
  }

  public async getById(threadId: number): Promise<ThreadModel> {
    return PgThreadMapper.mapToThreadModel(await this.findThread({ id: threadId }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<ThreadModel[]> {
    return (await this.findThreads({ where: { author: author } })).map(
      (dbThread) => PgThreadMapper.mapToThreadModel(dbThread),
    );
  }

  public async getAll(options: DataOptions): Promise<ThreadModel[]> {
    return (await this.findThreads(options)).map((dbThread) =>
      PgThreadMapper.mapToThreadModel(dbThread),
    );
  }

  public async createThread(threadData: ThreadCreateDto): Promise<ThreadModel> {
    if (!threadData) {
      throw ApiError.BadRequest('Thread is undefined!');
    }
    const thread = this.threadRepository.create({
      author: { id: threadData.authorId },
      ...threadData,
    });

    await this.threadRepository.insert(thread);

    const dbThread = await this.getById(thread.id);

    return dbThread;
  }

  public async updateThread(
    threadUpdateData: ThreadUpdateDto,
  ): Promise<ThreadModel> {
    await this.threadRepository.update(threadUpdateData.threadId, {
      text: threadUpdateData.text,
      title: threadUpdateData.title,
    });

    const dbThread = await this.getById(threadUpdateData.threadId);

    return dbThread;
  }

  public async deleteThread(Thread: ThreadModel): Promise<void> {
    const dbThread = await this.findThread({ Thread });
    await this.threadRepository.remove(dbThread);
  }
}

export default PgThreadRepository;
