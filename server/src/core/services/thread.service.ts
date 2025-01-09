import { inject, injectable } from 'inversify';
import ThreadModel from '../models/thread.model';
import ThreadRepository from '../repositories/thread.repository.type';
import { ThreadTypes } from '../../utils/types/containers/thread.types';
import { ThreadUpdateDto } from '../../utils/dtos/thread/thread-update.dto';
import { DataOptions } from '../../utils/types/data-options..typets';
import { ThreadCreateInputDto } from '../../utils/dtos/thread/thread-create-input.dto';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { SectionService } from './section.service';

@injectable()
export class ThreadService {
  constructor(
    @inject(ThreadTypes.ThreadRepository)
    private threadRepository: ThreadRepository,
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
  ) {}

  public async createThread(
    threadData: ThreadCreateInputDto,
  ): Promise<ThreadModel> {
    const section = await this.sectionService.getSection(
      threadData.sectionTitle,
    );

    return this.threadRepository.createThread({
      section: section,
      ...threadData,
    });
  }

  public async updateThread(threadData: ThreadUpdateDto): Promise<ThreadModel> {
    return this.threadRepository.updateThread(threadData);
  }

  public async deleteThread(threadId: number): Promise<void> {
    const dbPost = await this.threadRepository.getById(threadId);
    return this.threadRepository.deleteThread(dbPost);
  }

  public async getThreads(options: DataOptions): Promise<ThreadModel[]> {
    return this.threadRepository.getAll(options);
  }

  public async getThreadById(threadId: number): Promise<ThreadModel> {
    return this.threadRepository.getById(threadId);
  }
}
