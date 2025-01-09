import { ThreadCreateDto } from '../../utils/dtos/thread/thread-create.dto';
import { ThreadUpdateDto } from '../../utils/dtos/thread/thread-update.dto';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import { DataOptions } from '../../utils/types/data-options..typets';
import ThreadModel from '../models/thread.model';

type ThreadRepository = {
  getById(id: number): Promise<ThreadModel>;
  getByAuthor(author: UserSafeDto): Promise<ThreadModel[]>;
  getAll(options: DataOptions): Promise<ThreadModel[]>;
  createThread(threadData: ThreadCreateDto): Promise<ThreadModel>;
  updateThread(threadUpdateData: ThreadUpdateDto): Promise<ThreadModel>;
  deleteThread(thread: ThreadModel): Promise<void>;
};

export default ThreadRepository;
