import { Container } from 'inversify';
import { ThreadTypes } from '../types/thread.types';
import ThreadService from '../services/thread.service';
import PgThreadRepository from '../../db/dbRepositories/thread.repository';
import ThreadRepository from '../repositories/thread.repository.type';

const threadContainer = new Container({ defaultScope: "Singleton" });
threadContainer.bind<ThreadService>(ThreadTypes.ThreadService).to(ThreadService);
threadContainer.bind<ThreadRepository>(ThreadTypes.ThreadRepository).to(PgThreadRepository);

export { threadContainer };