import api from '@/app/api';
import ThreadUpdate from '@/types/board/threads/ThreadUpdate';
import { ThreadModel } from '@/types/models/Thread';
import ThreadCreate from '@/types/board/threads/ThreadCreate';

class ThreadService {
  static getAllThreads = async (
    page: number,
    take: number,
  ): Promise<ThreadModel[]> => {
    if (page > 1) {
      page += take;
    }
    const { data } = await api.get<ThreadModel[]>('/thread/all', {
      params: {
        skip: page - 1,
        take: take,
      },
    });
    return data;
  };

  static getThreadById = async (threadId: number): Promise<ThreadModel> => {
    const { data } = await api.get('/thread', {
      params: { threadId: threadId },
    });
    return data;
  };

  static editThread = async (
    threadUpdateData: ThreadUpdate,
  ): Promise<ThreadModel> => {
    const { data } = await api.put<ThreadModel>(
      '/thread/update',
      threadUpdateData,
    );
    return data;
  };

  static createThread = async (
    threadCreateData: ThreadCreate,
  ): Promise<ThreadModel> => {
    const { data } = await api.post<ThreadModel>(
      '/thread/create',
      threadCreateData,
    );
    return data;
  };

  static deleteThread = async (threadId: number) => {
    return await api.delete('/thread/delete', {
      data: { id: threadId },
    });
  };

  static getThreadsCount = async () => {
    const { data } = await api.get('/thread/allCount');
    return data;
  };
}

export default ThreadService;
