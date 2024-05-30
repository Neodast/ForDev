import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import ThreadModel from '../models/thread.model';

type ThreadRepository = {
  getById(id: number): Promise<ThreadModel>;
  getByAuthor(author: UserSafeDto): Promise<ThreadModel[]>;
  getAll(): Promise<ThreadModel[]>;
  createThread(threadData: ThreadModel): Promise<ThreadModel>;
  updateThread(id: number, newThreadData: ThreadModel): Promise<ThreadModel>;
  deleteThread(thread: ThreadModel): Promise<void>;
};

export default ThreadRepository;
